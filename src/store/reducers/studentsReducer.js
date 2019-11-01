import * as actionTypes from "../actions/actionTypes";

const initialState = {
  students : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
