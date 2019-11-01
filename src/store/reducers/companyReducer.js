import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  operatingSince: "",
  phoneNo: "",
  facebook: "",
  website: "",
  introduction: "",
  address: "",
  vacancies : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMPANY:
    const {  vacancies } = action.payload;
      return {
        ...initialState,
        ...action.payload,
        vacancies: vacancies ? vacancies : []
      };
    case actionTypes.SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
