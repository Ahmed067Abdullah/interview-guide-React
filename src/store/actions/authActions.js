import { database, auth } from "firebase";
import * as actionTypes from "./actionTypes";
import dispatcher from "../dispater";

import adminId from "../../config/AdminId";

// helper functions
const loginSuccessful = (dispatch, uid, name, status, type) => {
  const user = { uid, name, status, type };
  localStorage.setItem("crs", JSON.stringify(user));
  
  if (uid === adminId) dispatch(dispatcher(actionTypes.SET_ADMIN));
  else dispatch(checkForBlocked(user));
  
  dispatch(dispatcher(actionTypes.SIGNIN_SUCCESSFUL, user));
};

const loginFailed = dispatch => {
  dispatch(dispatcher(actionTypes.STOP_LOADING));
  console.log("error in sign in after authenticating");
};

// actions
export const changeInput = payload =>
  dispatcher(actionTypes.CHANGE_INPUT, payload);

export const setSignedIn = user => dispatch => {
  const { uid, name, status, type } = user;
  loginSuccessful(dispatch, uid, name, status, type);
};

export const signup = history => (dispatch, getState) => {
  const {
    type,
    name,
    email,
    enrollNo,
    dept,
    phoneNo,
    address,
    password
  } = getState().auth;

  const newUser = { name, email };
  newUser.disabled = false;
  if (type === "students") {
    newUser.enrollNo = enrollNo;
    newUser.dept = dept;
  } else if (type === "companies") {
    newUser.phoneNo = phoneNo;
    newUser.address = address;
  }
  dispatch(dispatcher(actionTypes.START_LOADING));
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      const uid = res.user.uid;
      database()
        .ref(`${type}/${uid}`)
        .set(newUser)
        .then(res => {
          const status = type === "students" ? 2 : 3;
          loginSuccessful(dispatch, uid, name, status, status);
          history.replace("/profile");
        });
    })
    .catch(error => {
      dispatch(dispatcher(actionTypes.STOP_LOADING));
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use")
        errorMessage = "Account For This Email is Already Registered";
      else if (error.code === "auth/invalid-email")
        errorMessage = "Invalid Email";
      else errorMessage = error.message;
      dispatch(dispatcher(actionTypes.SIGNUP_ERROR, { error: errorMessage }));
    });
};

export const signin = history => (dispatch, getState) => {
  const { email, passwordSignin } = getState().auth;
  dispatch(dispatcher(actionTypes.START_LOADING));
  auth()
    .signInWithEmailAndPassword(email, passwordSignin)
    .then(res => {
      const uid = res.user.uid;
      if (uid === "TAaiLOe1CvYB9ohfQtYMWremVHB2") {
        loginSuccessful(dispatch, uid, "Admin", 1);
        history.replace("/students");
      } else {
        database()
          .ref(`students/${uid}`)
          .once("value")
          .then(res => {
            if (res.val()) {
              let status = 2;
              let type = 2;
              if (res.val().disabled) status = 4;
              loginSuccessful(dispatch, uid, res.val().name, status, type);
              history.replace("/profile");
            } else {
              database()
                .ref(`companies/${uid}`)
                .once("value")
                .then(res => {
                  if (res.val()) {
                    let status = 3;
                    let type = 3;
                    if (res.val().disabled) status = 4;
                    loginSuccessful(
                      dispatch,
                      uid,
                      res.val().name,
                      status,
                      type
                    );
                    history.replace("/profile");
                  }
                })
                .catch(err => {
                  loginFailed(dispatch);
                });
            }
          })
          .catch(err => {
            loginFailed(dispatch);
          });
      }
    })
    .catch(error => {
      dispatch(dispatcher(actionTypes.STOP_LOADING));
      let errorMessage = "";
      if (error.code === "auth/wrong-password") errorMessage = "Wrong Password";
      else if (error.code === "auth/user-not-found")
        errorMessage = "User Doesn't Exist";
      else errorMessage = error.message;
      dispatch(dispatcher(actionTypes.SIGNIN_ERROR, { error: errorMessage }));
    });
};

export const signout = () => dispatch => {
  dispatch(dispatcher(actionTypes.SIGNOUT));
  localStorage.removeItem("crs");
};

export const manipulateAccount = (type, uid, flag) => dispatch => {
  database()
    .ref(`/${type}/${uid}/disabled`)
    .set(flag);
};

export const checkForBlocked = user => (dispatch, getState) => {
  const { uid, type } = user;
  const typeStr = type === 2 ? "students" : "companies";

  database()
    .ref(`/${typeStr}/${uid}/disabled`)
    .on("value", snapshot => {
      const { isSignedIn, admin } = getState().auth;
      if (isSignedIn && !admin) {
        localStorage.setItem("crs", JSON.stringify(user));
        const flag = snapshot.val();
        if (flag) dispatch(dispatcher(actionTypes.SET_BLOCKED, { status: 4 }));
        else dispatch(dispatcher(actionTypes.SET_BLOCKED, { status: type }));
      }
    });
};
