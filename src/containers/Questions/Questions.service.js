import { database } from "firebase";

export const addQuestion = (question, company) =>
  new Promise((resolve, reject) => {
    console.log(company)
    if(company.__isNew__){
      database()
      .ref('companies/')
      .push(company.label)
      .then(res => console.log("Successfully added company"))
      .catch(err => console.log("Error occured while adding company"));
    }
    database()
      .ref(`questions/`)
      .push(question)
      .then(res => resolve("Successfully added question"))
      .catch(err => reject("Error occured while storing user info"));    
  });

export const getAllQuestions = (setQuestions, setLoading) => {
  database()
    .ref(`questions/`)
    .on("value", snapshot => {
      setQuestions(
        snapshot.val() ? Object.values(snapshot.val()).reverse() : []
      );
      setLoading(false);
    });
};

export const getAllCompanies = setCompanies => {
  database()
    .ref(`companies/`)
    .on("value", snapshot => {
      let companies = snapshot.val();
      if (companies) {
        companies = Object.values(snapshot.val())
        companies = companies.map(c => ({label: c, value: c}))
      } else {
        companies = [];
      }
      setCompanies(companies);
    });
};
