import actionTypes from "./Auth.action";

const initialState = {
  user: "ahmed",
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.SET_USER:
      return { ...state, user: data };
    default:
      return state;
  }
};

export default reducer;