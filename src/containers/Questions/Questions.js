import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddQuestionModal from "../../components/AddQuestionModal/AddQuestionModal";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../Auth/Auth.service";
import { addQuestion } from "./Questions.service";
import styles from "./Questions.styles";

const Questions = ({ callLogout, classes, user }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(true);

  useEffect(() => {
    // apply listener here, also deal with loading variable
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
      Question list
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  callLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Questions));
