import {combineReducers} from "redux";

import userReducer from "./user/reducer";
import transactionReducer from "./transaction/reducer";

export default combineReducers({
  user: userReducer,
  transaction: transactionReducer,
});
