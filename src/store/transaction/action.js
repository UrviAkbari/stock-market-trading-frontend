import axios from "axios";
import {Toast} from "../../util/Toast";

import {GET_TRANSACTION_HISTORY} from "./types";

export const getTransactionHistory = (id, type) => (dispatch) => {
  axios
    .get(`transaction?user=${id}&type=${type}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_TRANSACTION_HISTORY,
          payload: res.data.transaction,
        });
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const buySellStock = (data) => (dispatch) => {
  console.log(data);
  axios
    .post("transaction", data)
    .then((res) => {
      if (res.data.status) {
        debugger;
        Toast("success", "Stock Buy Successfully!");
      } else {
        debugger;
        Toast("error", res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
