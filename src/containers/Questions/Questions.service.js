import { database } from "firebase";

export const addQuestion = (question) =>
  new Promise((resolve, reject) => {
    database()
      .ref(`questions/`)
      .push(question)
      .then(res => resolve("Successfully added question"))
      .catch(err => reject("Error occured while storing user info"));
  });
