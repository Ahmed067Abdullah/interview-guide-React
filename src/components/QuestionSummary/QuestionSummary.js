import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./QuestionSummary.styles";
import moment from "moment";
import Button from "../Button/Button";

const QuestionSummary = ({ classes, question, onClick }) => {
  return (
    <div className={classes["question-container"]}>
      <div className={classes["question-info"]}>
        <p className={classes["small-text"]}>
          <i className="fas fa-user-tie"></i>
          <span>
            {question.company} ({question.interviewType})
          </span>
        </p>
        <p className={classes["small-text"]}>
          <i className="fas fa-flag"></i>
          <span>{question.position}</span>
        </p>
      </div>
      <p className={classes["question"]}>
        Q.{" "}
        <span>
          {question.question.length > 256
            ? `${question.question.slice(0, 256)}...`
            : question.question}
        </span>
      </p>
      <div className={classes["question-info"]}>
        <p className={classes["small-text"]}>
          <i className="fas fa-user"></i>
          <span>{question.createdByName}</span>
        </p>
        <p className={classes["small-text"]}>
          <i className="fas fa-clock"></i>
          <span>
            {moment(question.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </p>
      </div>
      <div className={classes["question-info"]}>
        <p className={classes["normal-text"]}>
          <span>Answer Provided:</span>{" "}
          {question.answer ? (
            <i className="fas fa-check" />
          ) : (
            <i className="fas fa-times" />
          )}
        </p>
        <p className={classes["small-text"]}>
          <i className="fas fa-comments"></i>
          <span>{question.comments ? question.comments.length : 0}</span>
        </p>
      </div>
      <Button onClick={onClick} className={classes["submit-btn"]}>
        View Details
        <i className="fas fa-chevron-right" />
      </Button>
    </div>
  );
};

export default withStyles(styles)(QuestionSummary);
