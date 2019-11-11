import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddQuestionModal from "../../components/AddQuestionModal/AddQuestionModal";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../Auth/Auth.service";
import {
  addQuestion,
  addComment,
  getAllQuestions,
  getAllCompanies,
  getAllPositions,
  getAllTags,
} from "./Questions.service";
import styles from "./Questions.styles";
import Loader from "../../components/Loader/Loader";
import FiltersModal from "../../components/FiltersModal/FiltersModal";
import ViewQuestionModal from "../../components/ViewQuestionModal/ViewQuestionModal";
import QuestionSummary from "../../components/QuestionSummary/QuestionSummary";

const Questions = ({ callLogout, classes, user }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [allPositions, setAllPositions] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [filters, setFilters] = useState({
    text: "",
    company: [],
    position: [],
    type: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showViewQuestionModal, setShowViewQuestionModal] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllCompanies(setAllCompanies);
    getAllPositions(setAllPositions);
    getAllTags(setAllTags);
    getAllQuestions(setAllQuestions, setLoading);
  }, []);

  useEffect(() => {
    if (showViewQuestionModal) {
      setShowViewQuestionModal(
        allQuestions.find(q => q.id === showViewQuestionModal.id)
      );
    }
  }, [allQuestions, showViewQuestionModal]);

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
    if (company.length) {
      questions = questions.reduce((acc, q) => {
        if (company.find(c => c.toLowerCase() === q.company.toLowerCase()))
          acc.push(q);
        return acc;
      }, []);
    }

    // filter for position
    if (position.length) {
      questions = questions.reduce((acc, q) => {
        if (position.find(p => p.toLowerCase() === q.position.toLowerCase()))
          acc.push(q);
        return acc;
      }, []);
    }

    // filter for tags
    if (tags.length) {
      questions = questions.reduce((acc, q) => {
        if (
          tags.find(t => {
            const regex = new RegExp(t, "gi");
            if (q.tags.match(regex)) return t;
            return null;
          })
        )
          acc.push(q);
        return acc;
      }, []);
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
    <div className={classes["container"]}>
      <Navbar
        showFiltersModal={setShowFiltersModal}
        showModal={setShowAddModal}
        callLogout={callLogout}
        filtersApplied={
          filters.text ||
          filters.company.length ||
          filters.position.length ||
          (filters.type && filters.type !== "All") ||
          filters.tags.length
        }
      />
      <AddQuestionModal
        addQuestion={addQuestion}
        open={showAddModal}
        handleClose={setShowAddModal}
        defaultCompanies={allCompanies}
        defaultPositions={allPositions}
        defaultTags={allTags}
        user={user}
      />
      <ViewQuestionModal
        open={showViewQuestionModal}
        length={showViewQuestionModal && showViewQuestionModal.comments.length}
        handleClose={setShowViewQuestionModal}
        callAddComment={addComment}
        user={user}
      />
      <FiltersModal
        setFilters={setFilters}
        open={showFiltersModal}
        defaultCompanies={allCompanies}
        defaultPositions={allPositions}
        defaultTags={allTags}
        handleClose={setShowFiltersModal}
      />
      <div className={classes["questions-container"]}>
        {loading ? (
          <div className={classes["main-loader-container"]}>
            <Loader />
          </div>
        ) : filteredQuestions.length ? (
          filteredQuestions.map(q => (
            <QuestionSummary
              key={q.createdAt}
              question={q}
              onClick={() => setShowViewQuestionModal(q)}
            />
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
