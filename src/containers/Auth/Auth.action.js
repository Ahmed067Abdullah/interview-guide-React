import { LOGOUT } from "../../utils/constants";

const actionTypes = {
  SET_USER: "SET_USER",
};

export const setUser = user => ({
  type: actionTypes.SET_USER,
  data: user,
});

export const clearState = () => ({
  type: LOGOUT,
});

export default actionTypes;
