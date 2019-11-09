import { database } from "firebase";

export const addQuestion = (question, company, position) =>
  new Promise((resolve, reject) => {
    if (company.__isNew__) {
      database()
        .ref("companies/")
        .push(company.label)
        .then(() => console.log("Successfully added company"))
        .catch(() => console.log("Error occured while adding company"));
    }
    if (position.__isNew__) {
      database()
        .ref("positions/")
        .push(position.label)
        .then(() => console.log("Successfully added position"))
        .catch(() => console.log("Error occured while adding position"));
    }
    database()
      .ref("questions/")
      .push(question)
      .then(res => resolve("Successfully added question"))
      .catch(err => reject("Error occured while storing user info"));
  });

export const getAllQuestions = (setQuestions, setLoading) => {
  database()
    .ref("questions/")
    .on("value", snapshot => {
      setQuestions(
        snapshot.val() ? Object.values(snapshot.val()).reverse() : []
      );
      setLoading(false);
    });
};

export const getAllCompanies = setCompanies => {
  database()
    .ref("companies/")
    .on("value", snapshot => {
      let companies = snapshot.val();
      if (companies) {
        companies = Object.values(companies);
        companies = companies.map(c => ({ label: c, value: c }));
      } else {
        companies = [];
      }
      setCompanies(companies);
    });
};

export const getAllPositions = setPositions => {
  database()
    .ref("positions/")
    .on("value", snapshot => {
      let positions = snapshot.val();
      if (positions) {
        positions = Object.values(positions);
        positions = positions.map(p => ({ label: p, value: p }));
      } else {
        positions = [];
      }
      setPositions(positions);
    });
};
