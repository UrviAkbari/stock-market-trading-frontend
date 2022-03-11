import setToken from "../../util/SetToken";
import setDevKey from "../../util/SetDevKey";
import jwt_decode from "jwt-decode";
import {key} from "../../util/Config";

import {SET_USER, UNSET_USER, UPDATE_PROFILE} from "./types";

const initialState = {
  isAuth: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  let decoded;

  switch (action.type) {
    case SET_USER:
      if (action.payload) {
        decoded = jwt_decode(action.payload);
      }
      setToken(action.payload);
      setDevKey(key);
      localStorage.setItem("TOKEN", action.payload);
      localStorage.setItem("KEY", key);
      return {
        ...state,
        isAuth: true,
        user: decoded,
      };

    case UNSET_USER:
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("KEY");
      setDevKey(null);
      setToken(null);
      return {
        ...state,
        isAuth: false,
        user: {},
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          _id: action.payload._id,
          name: action.payload.name,
          userName: action.payload.userName,
          image: action.payload.image,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
