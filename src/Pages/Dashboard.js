import React, {useEffect, useState} from "react";
// socket io
import {io} from "socket.io-client";
//react-redux
import {useSelector} from "react-redux";

//serverpath
import {baseURL} from "../util/Config";

//dialog
import BuySellDialog from "../Component/Dialog/BuySellDialog";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [detail, setDetail] = useState(null);
  const [balance, setBalance] = useState();

  const [modal, setModal] = useState(false);

  //Socket io
  const socket = io(baseURL, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection Successful");
    });
    socket.emit("latestPrice", user._id);
    socket.on("latestPrice", (data) => {
      setData(data.dashboard);
      setBalance(data.balance);
    });
  }, []);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const handleBuySell = (val, data_) => {
    setDetail(data_);
    setType(val);
    toggle();
  };

  let sum = data.reduce(function (prev, current) {
    return prev + current.balance;
  }, 0);
  console.log(sum);
  return (
    <>
      <div className="row">
        <div className="col-xl-4">
          <div className="card overflow-hidden">
            <div className="bg-dark bg-soft">
              <div className="row">
                <div className="text-end p-3">
                  <h5 className="text-dark" style={{marginRight: "10px"}}>
                    Trading Amount
                  </h5>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="row">
                <div className="col-sm-12">
                  <div className="avatar-md profile-user-wid ">
                    <div className="flex-shrink-0 align-self-center ">
                      <div className="avatar-sm rounded-circle bg-dark mini-stat-icon">
                        <span className="avatar-title rounded-circle bg-dark">
                          <i className="bx  bx-notepad  font-size-24 "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row col-sm-12">
                <div className="row">
                  <div className="col-12">
                    <h3>{balance}</h3>
                    <h6 className="text-muted mb-0">Total Trading Amount</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card overflow-hidden">
            <div className="bg-dark bg-soft">
              <div className="row">
                <div className="text-end p-3">
                  <h5 className="text-dark" style={{marginRight: "10px"}}>
                    Balance
                  </h5>
                </div>
              </div>
            </div>
            <div className="card-body pt-0">
              <div className="row">
                <div className="col-sm-12">
                  <div className="avatar-md profile-user-wid ">
                    <div className="flex-shrink-0 align-self-center ">
                      <div className="avatar-sm rounded-circle bg-dark mini-stat-icon">
                        <span className="avatar-title rounded-circle bg-dark">
                          <i className="far fa-money-bill-alt  font-size-24 "></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row col-sm-12">
                <div className="row">
                  <div className="col-12">
                    <h3>{sum}</h3>
                    <h6 className="text-muted mb-0">Total Balance</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Available Stock</th>
              <th>Sell Stock</th>
              <th>Your Stock</th>
              <th>Balance</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {data?.length > 0 ? (
              data.map((value, index) => {
                // setBalance((balance += value?.balance));
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value?.companyName}</td>
                    <td>{value?.ticker}</td>
                    <td className="text-primary styleForTitle">
                      {value?.price}
                    </td>
                    <td className="styleForTitle">{value?.stocks}</td>

                    <td>{value?.avalilableStocks}</td>
                    <td>{value?.sellStocks}</td>
                    <td>{value?.userStock}</td>
                    <td>{value?.balance}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleBuySell("Buy", value)}
                      >
                        BUY
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleBuySell("Sell", value)}
                      >
                        SELL
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No data found !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BuySellDialog isOpen={modal} toggle={toggle} type={type} data={detail} />
    </>
  );
};

export default Dashboard;
