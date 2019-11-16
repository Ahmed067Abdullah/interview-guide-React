import { database } from "firebase";
import { verifyMe } from "../Auth/Auth.service";

const publishNewEntry = (type, entry, prevEntries) => {
  if (entry.__isNew__ && !prevEntries.find(c => c.label === entry.label)) {
    publishEntry(type, entry.label);
  }
};

const publishEntry = (type, entry, res, rej) => {
  database()
    .ref(`${type}/`)
    .push(entry)
    .then(() => {
      console.log(`Successfully added entry to ${type}`);
      if (res) res("Successfully added question");
    })
    .catch(() => {
      console.log(`Error occured while adding entry to ${type}`);
      if (rej) rej("Error occured while adding question");
    });
};

export const addQuestion = (
  question,
  company,
  defaultCompanies,
  position,
  defaultPositions,
  tags,
  defaultTags
) =>
  new Promise(async (resolve, reject) => {
    const user = await verifyMe(question.createdBy);
    if (!user) {
      reject("Sorry, Your account has been disabled");
      return;
    }
    const newTags = [];
    for (let i = 0; i < tags.length; i++) {
      if (
        tags[i].__isNew__ &&
        !defaultTags.find(t => t.label === tags[i].label)
      ) {
        newTags.push(tags[i].label);
      }
    }
    if (newTags.length > 5) {
      reject("There are too many new tags");
      return;
    }

    publishNewEntry("companies", company, defaultCompanies);

    publishNewEntry("positions", position, defaultPositions);

    for (let i = 0; i < newTags.length; i++) {
      publishEntry("tags", newTags[i]);
    }

    publishEntry("questions", question, resolve, reject);
  });

export const getAllQuestions = (setQuestions, setLoading) => {
  database()
    .ref("questions/")
    .on("value", snapshot => {
      const questions = snapshot.val();
      setQuestions(
        questions
          ? Object.keys(questions)
              .reverse()
              .map(q => ({
                ...questions[q],
                comments: questions[q].comments
                  ? [...Object.values(questions[q].comments)]
                  : [],
                id: q,
              }))
          : []
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

export const addComment = async (text, user, qid, scrollToBottom) => {
  const userExists = await verifyMe(user.uid);
  if (!userExists) {
    return;
  }
  await database()
    .ref(`questions/${qid}/comments`)
    .push({
      text,
      postedByName: user.name,
      postedBy: user.uid,
      postedAt: Date.now(),
    });
  setTimeout(scrollToBottom, 2000);
};

export const callSupportQuestion = async (
  question,
  company,
  defaultCompanies,
  position,
  defaultPositions,
  uid
) => {
  const user = await verifyMe(uid);
  if (!user) {
    return;
  }
  publishNewEntry("companies", company, defaultCompanies);
  publishNewEntry("positions", position, defaultPositions);

  const temp = { ...question };
  temp.company = `${temp.company}, ${company.label}`;
  temp.position = `${temp.position}, ${position.label}`;

  database()
    .ref(`questions/${temp.id}/company/`)
    .set(temp.company);
  database()
    .ref(`questions/${temp.id}/position/`)
    .set(temp.position);
};
