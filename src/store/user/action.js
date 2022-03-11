import axios from "axios";
import {Toast} from "../../util/Toast";

import {SET_USER, UNSET_USER, UPDATE_PROFILE} from "./types";

export const register = (data) => (dispatch) => {
  axios
    .post("user", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "You have successfully registered in StockMarket.");
        debugger;
        dispatch({type: SET_USER, payload: res.data.token});
        setTimeout(() => {
          window.location.href = "/user/dashboard";
        }, 1000);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};
export const login = (data) => (dispatch) => {
  axios
    .post("user/login", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "You have successfully logged in StockMarket.");
        dispatch({type: SET_USER, payload: res.data.token});
        setTimeout(() => {
          window.location.href = "/user/dashboard";
        }, 1000);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const getProfile = () => (dispatch) => {
  axios
    .get("user/profile")
    .then((res) => {
      if (res.data.status) {
        dispatch({type: UPDATE_PROFILE, payload: res.data.user});
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};

export const changePassword = (data) => (dispatch) => {
  axios
    .put("user", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Password changed successfully.");
        setTimeout(() => {
          dispatch({type: UNSET_USER});
          window.location.href = "/";
        }, [2000]);
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};
export const updateNameEmail = (data) => (dispatch) => {
  axios
    .patch("user", data)
    .then((res) => {
      if (res.data.status) {
        Toast("success", "Profile updated successfully.");
        dispatch({type: UPDATE_PROFILE, payload: res.data.user});
      } else {
        Toast("error", res.data.message);
      }
    })
    .catch((error) => Toast("error", error.message));
};
