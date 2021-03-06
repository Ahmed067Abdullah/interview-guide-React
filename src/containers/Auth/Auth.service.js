import { database, auth } from "firebase";
import dispatcher from "../../store/dispater";
import { setUser, clearState } from "./Auth.action";

export const verifyMe = async uid => {
  const snapshot = await database()
    .ref(`users/${uid}`)
    .once("value");
  return snapshot.val();
};

export const successfullyAuthenticated = (user, history, dispatch) => {
  dispatch(setUser(user));
  localStorage.setItem("interview-guide", JSON.stringify(user));
  history.replace("/questions");
};

export const signup = ({ name, email, password }, history) => dispatch =>
  new Promise(async (resolve, reject) => {
    // check if user with same name already exists
    const snapshot = await database()
      .ref("users/")
      .once("value");
    const userWithSameName = Object.values(snapshot.val()).find(
      u => u.name === name
    );
    if (userWithSameName) {
      reject("Name is not available");
      return;
    }

    // created user if name not already taken
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user.uid;
        database()
          .ref(`users/${uid}`)
          .set({ uid, name, email })
          .then(res => {
            successfullyAuthenticated(
              {
                uid,
                email,
                name,
              },
              history,
              dispatch
            );
          })
          .catch(err => reject("Error occured while storing user info"));
      })
      .catch(error => {
        let errorMessage = "";
        if (error.code === "auth/email-already-in-use")
          errorMessage = "Account For This Email is Already Registered";
        else if (error.code === "auth/invalid-email")
          errorMessage = "Invalid Email";
        else errorMessage = error.message;
        reject(errorMessage);
      });
  });

export const signin = ({ email, password }, history) => dispatch =>
  new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user.uid;
        database()
          .ref(`users/${uid}`)
          .once("value")
          .then(res => {
            if (res.val()) {
              successfullyAuthenticated(
                {
                  uid,
                  email,
                  name: res.val().name,
                },
                history,
                dispatch
              );
            } else {
              reject("Can't find user details");
            }
          })
          .catch(err => {
            console.log(err);
            reject("Can't get user details");
          });
      })
      .catch(error => {
        let errorMessage = "";
        if (error.code === "auth/wrong-password")
          errorMessage = "Wrong Password";
        else if (error.code === "auth/user-not-found")
          errorMessage = "User Doesn't Exist";
        else errorMessage = error.message;
        reject(errorMessage);
      });
  });

export const logout = () => dispatch => {
  localStorage.removeItem("interview-guide");
  dispatcher(dispatch(clearState()));
};
