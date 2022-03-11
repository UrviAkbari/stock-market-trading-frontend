import {GET_TRANSACTION_HISTORY} from "./types";

const initialState = {
  transaction: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION_HISTORY:
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};

export default transactionReducer;
