import { database } from "firebase";

export const addQuestion = (question, company, position, tags) =>
  new Promise((resolve, reject) => {
    const newTags = [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].__isNew__) {
        newTags.push(tags[i].label);
      }
    }
    if (newTags.length > 5) {
      reject("There are too many new tags");
      return;
    }

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

    for (let i = 0; i < newTags.length; i++) {
      database()
        .ref("tags/")
        .push(newTags[i])
        .then(() => console.log("Successfully added tag"))
        .catch(() => console.log("Error occured while adding tag"));
    }

    database()
      .ref("questions/")
      .push(question)
      .then(res => resolve("Successfully added question"))
      .catch(err => reject("Error occured while storing question"));
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

const sortArray = arr => arr.sort((a, b) => (a > b ? 1 : -1));

export const getAllCompanies = setCompanies => {
  database()
    .ref("companies/")
    .on("value", snapshot => {
      let companies = snapshot.val();
      if (companies) {
        companies = Object.values(companies);
        companies = sortArray(companies);
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
        positions = sortArray(positions);
        positions = positions.map(p => ({ label: p, value: p }));
      } else {
        positions = [];
      }
      setPositions(positions);
    });
};

export const getAllTags = setTags => {
  database()
    .ref("tags/")
    .on("value", snapshot => {
      let tags = snapshot.val();
      if (tags) {
        tags = Object.values(tags);
        tags = sortArray(tags);
        tags = tags.map(t => ({ label: t, value: t }));
      } else {
        tags = [];
      }
      setTags(tags);
    });
};
