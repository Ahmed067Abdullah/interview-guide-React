import dispatcher from "../dispater";
import { database } from "firebase";
import * as actionTypes from "./actionTypes";

export const getProfile = uid => dispatch => {
  dispatch(dispatcher(actionTypes.START_LOADING));
  database()
    .ref(`/companies/${uid}`)
    .on("value", snapshot => {
      const company = snapshot.val();
      dispatch(dispatcher(actionTypes.SET_COMPANY, company));
      dispatch(dispatcher(actionTypes.STOP_LOADING));
    });
};

export const saveProfile = (uid, payload) => (dispatch,getState) => {
    if(getState().company.name.trim() !== payload.name.trim()){
      alert("name changed");
    }
  database()
    .ref(`/companies/${uid}`)
    .set(payload);
};

export const saveVacancies = (uid, payload) => dispatch => {
  database()
    .ref(`/companies/${uid}/vacancies`)
    .set(payload);
};

export const getVacancies = () => dispatch => {
  dispatch(dispatcher(actionTypes.START_LOADING));
  database()
    .ref(`/companies/`)
    .on("value", snapshot => {
      const vacanciesObj = snapshot.val();
      let vacancies = [];
      for (let key in vacanciesObj) {
        if (vacanciesObj[key].disabled) continue;
        const vacs = vacanciesObj[key].vacancies;
        for (let vac in vacs)
          vacancies.push({
            postedById: key,
            postedBy: vacanciesObj[key].name,
            ...vacs[vac]
          });
      }
      dispatch(dispatcher(actionTypes.SET_VACANCIES, vacancies));
      dispatch(dispatcher(actionTypes.STOP_LOADING));
    });
};

export const getCompanies = flag => dispatch => {
  dispatch(dispatcher(actionTypes.START_LOADING));
  database()
    .ref(`/companies/`)
    .on("value", snapshot => {
      const companiesObj = snapshot.val();
      let companies = [];
      if (flag) {
        for (let key in companiesObj) 
          companies.push({ id: key, ...companiesObj[key] });
      } else {
        for (let key in companiesObj) {
          if (companiesObj[key].disabled) continue;
          companies.push({ id: key, ...companiesObj[key] });
        }
      }
      dispatch(dispatcher(actionTypes.SET_COMPANIES, companies));
      dispatch(dispatcher(actionTypes.STOP_LOADING));
    });
};
