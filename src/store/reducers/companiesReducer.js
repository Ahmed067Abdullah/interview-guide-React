import * as actionTypes from "../actions/actionTypes";

const initialState = {
  companies : [],
  vacancies: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case actionTypes.SET_VACANCIES:
      return {
        ...state,
        vacancies: action.payload
      };
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
