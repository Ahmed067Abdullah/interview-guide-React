import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddQuestionModal from "../../components/AddQuestionModal/AddQuestionModal";
import Question from "../../components/Question/Question";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../Auth/Auth.service";
import { addQuestion, getAllQuestions } from "./Questions.service";
import styles from "./Questions.styles";
import Loader from "../../components/Loader/Loader";

const Questions = ({ callLogout, classes, user }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllQuestions(setAllQuestions, setLoading);
  }, []);

  return (
    <div>
      <Navbar showModal={setShowAddModal} callLogout={callLogout} />
      <AddQuestionModal
        addQuestion={addQuestion}
        open={showAddModal}
        handleClose={setShowAddModal}
        user={user}
      />
      <div className={classes["questions-container"]}>
        {loading ? (
          <div className={classes["main-loader-container"]}>
            <Loader />
          </div>
        ) : allQuestions.length ? (
          allQuestions.map(q => <Question question={q} />)
        ) : (
          <div className={classes["main-loader-container"]}>
            No Questions to Show
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  callLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Questions));
