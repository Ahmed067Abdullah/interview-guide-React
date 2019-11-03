import actionTypes from "./Auth.action";
import { LOGOUT } from "../../utils/constants";

const initialState = {
  user: null,
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return { ...state, user: data };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
