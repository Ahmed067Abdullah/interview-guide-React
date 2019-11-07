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
import FiltersModal from "../../components/FiltersModal/FiltersModal";

const Questions = ({ callLogout, classes, user }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    company: "",
    position: "",
    type: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllQuestions(setAllQuestions, setLoading);
  }, []);

  const search = (array, searchKey, searchText) => {
    const regex = new RegExp(searchText, "gi");
    array = array.reduce((acc, q) => {
      if (q[searchKey].match(regex)) acc.push(q);
      return acc;
    }, []);
    return array;
  };

  const applyFilters = () => {
    let questions = [...allQuestions];
    const { text, company, position, type, tags } = filters;

    // filter for interview type
    if (type && type !== "All") {
      questions = questions.reduce((acc, q) => {
        if (type === q.interviewType) acc.push(q);
        return acc;
      }, []);
    }

    // filter for company name
    if (company) {
      questions = search(questions, "company", company);
    }

    // filter for position
    if (position) {
      questions = search(questions, "position", position);
    }

    // filter for tags
    if (tags) {
      questions = search(questions, "tags", tags);
    }

    if (text) {
      const regex = new RegExp(text, "gi");
      questions = questions.reduce((acc, q) => {
        if (q.question.match(regex) || q.answer.match(regex)) acc.push(q);
        return acc;
      }, []);
    }
    return questions;
  };

  const filteredQuestions = applyFilters();

  return (
    <div>
      <Navbar
        showFiltersModal={setShowFiltersModal}
        showModal={setShowAddModal}
        callLogout={callLogout}
        filtersApplied={
          filters.text ||
          filters.company ||
          filters.position ||
          filters.type ||
          filters.tags
        }
      />
      <AddQuestionModal
        addQuestion={addQuestion}
        open={showAddModal}
        handleClose={setShowAddModal}
        user={user}
      />
      <FiltersModal
        setFilters={setFilters}
        open={showFiltersModal}
        handleClose={setShowFiltersModal}
      />
      <div className={classes["questions-container"]}>
        {loading ? (
          <div className={classes["main-loader-container"]}>
            <Loader />
          </div>
        ) : filteredQuestions.length ? (
          filteredQuestions.map(q => (
            <Question key={q.createdAt} question={q} />
          ))
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
