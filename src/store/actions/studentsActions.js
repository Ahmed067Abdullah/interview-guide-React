import dispatcher from "../dispater";
import { database } from "firebase";
import * as actionTypes from "./actionTypes";

export const getProfile = uid => dispatch => {
  dispatch(dispatcher(actionTypes.START_LOADING));
  database()
    .ref(`/students/${uid}`)
    .on("value", snapshot => {
      const student = snapshot.val();
      dispatch(dispatcher(actionTypes.SET_STUDENT, student));
      dispatch(dispatcher(actionTypes.STOP_LOADING));
    });
};

export const saveProfile = (uid, payload) => dispatch => {
  database()
    .ref(`/students/${uid}`)
    .set(payload);
};

export const saveEduExp = (uid, payload, field) => dispatch => {
  database()
    .ref(`/students/${uid}/${field}`)
    .set(payload);
};

export const getStudents = flag => dispatch => {
  dispatch(dispatcher(actionTypes.START_LOADING));
  database()
    .ref(`/students/`)
    .on("value", snapshot => {
      const studentsObj = snapshot.val();
      let students = [];
      if (flag) {
        for (let key in studentsObj)
          students.push({ id: key, ...studentsObj[key] });
      } else {
        for (let key in studentsObj) {
          if (studentsObj[key].disabled) continue;
          students.push({ id: key, ...studentsObj[key] });
        }
      }
      dispatch(dispatcher(actionTypes.SET_STUDENTS, students));
      dispatch(dispatcher(actionTypes.STOP_LOADING));
    });
};
