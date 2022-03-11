/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState} from "react";

import {connect, useSelector} from "react-redux";

import {Link} from "react-router-dom";

//action
import {getTransactionHistory} from "../../store/transaction/action";

//MUI
import {TablePagination} from "@material-ui/core";

//Pagination
import TablePaginationActions from "./Pagination";

const TransactionHistory = (props) => {
  //Define State
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [type, setType] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    props.getTransactionHistory(user._id, type);
  }, [user._id, type]);

  const transaction = useSelector((state) => state.transaction.transaction);

  useEffect(() => {
    setData(transaction);
  }, [transaction]);

  //handle Search Function
  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = transaction.filter((data) => {
        return (
          data?.ticker?.companyName?.toUpperCase()?.indexOf(value) > -1 ||
          data?.ticker?.ticker?.toUpperCase()?.indexOf(value) > -1 ||
          data?.type?.toUpperCase()?.indexOf(value) > -1 ||
          data?.howManyStock?.toString()?.indexOf(value) > -1 ||
          data?.price?.toString()?.indexOf(value) > -1 ||
          data?.date?.indexOf(value) > -1 ||
          data?.total?.toString()?.indexOf(value) > -1
        );
      });

      setData(data);
    } else {
      return setData(transaction);
    }
  };

  //Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">User Transaction History</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">
                    Transaction History
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/user/dashboard">Dashboard</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row my-3">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 float-right mt-3 mt-lg-0 mt-xl-0">
                    <ul class="nav nav-pills bg-light rounded" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-bs-toggle="tab"
                          href={() => false}
                          onClick={() => setType("all")}
                          role="tab"
                        >
                          All
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href={() => false}
                          onClick={() => setType("buy")}
                          role="tab"
                        >
                          Buy
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          href={() => false}
                          onClick={() => setType("sell")}
                          role="tab"
                        >
                          Sell
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex justify-content-end mt-3 mt-lg-0 mt-xl-0">
                    <form action="">
                      <div className="input-group  border rounded-pill">
                        <input
                          type="search"
                          id="searchBar"
                          autoComplete="off"
                          placeholder="Searching for..."
                          className="form-control bg-none border-0 rounded-pill searchBar"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Company Name</th>
                        <th>Ticker</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {data?.length > 0 ? (
                        data.map((value, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{value?.ticker?.companyName}</td>
                              <td>{value?.ticker?.ticker}</td>
                              <td className="text-primary styleForTitle">
                                {value?.howManyStock}
                              </td>
                              <td className="styleForTitle">{value?.price}</td>
                              <td>
                                {value?.type === "buy" ? (
                                  <span className="text-success styleForTitle">
                                    BUY
                                  </span>
                                ) : (
                                  <span className="text-danger styleForTitle">
                                    SELL
                                  </span>
                                )}{" "}
                              </td>
                              <td>
                                {" "}
                                {value?.type === "buy" ? (
                                  <span className="text-success styleForTitle">
                                    {value?.total}
                                  </span>
                                ) : (
                                  <span className="text-danger styleForTitle">
                                    {value?.total}
                                  </span>
                                )}
                              </td>
                              <td>{value?.date}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No data found !
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <TablePagination
                  className="mt-3"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    50,
                    100,
                    {label: "All", value: data.length},
                  ]}
                  component="div"
                  count={data.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {getTransactionHistory})(TransactionHistory);
