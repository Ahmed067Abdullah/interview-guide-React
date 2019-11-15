import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import styles from "./ViewQuestionModal.styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Question from "../Question/Question";
import Comment from "../Comment/Comment";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import SupportQuestion from "../SupportQuestion/SupportQuestion";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewQuestionModal = ({
  classes,
  defaultCompanies,
  defaultPositions,
  open,
  handleClose,
  user,
  callAddComment,
}) => {
  const [comment, setComment] = useState("");
  const [supporting, setSupporting] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setTimeout(scrollToBottom, 1000);
  }, [open]);

  const addComment = e => {
    e.preventDefault();
    const text = comment.trim();
    callAddComment(text, user, open.id, scrollToBottom);
    setComment("");
  };

  const scrollToBottom = () => {
    const el = document.getElementById("comments-container");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  return (
    <Dialog
      open={Boolean(open)}
      TransitionComponent={Transition}
      fullWidth
      fullScreen={fullScreen}
      maxWidth="md"
      // onClose={closeModal}
    >
      <div className={classes["container"]}>
        <IconButton
          className={classes["close-icon"]}
          aria-label="close"
          onClick={() => handleClose(null)}
        >
          <ClearIcon />
        </IconButton>
        {open ? (
          <div className={classes["content-container"]}>
            <p className={classes["heading"]}>Question</p>
            <Question question={open} />
            <div className={classes["divider"]} />
            <SupportQuestion
              toggleSupporting={setSupporting}
              supporting={supporting}
              defaultCompanies={defaultCompanies}
              defaultPositions={defaultPositions}
            />
            <div className={classes["divider"]} />
            <p className={classes["heading"]}>Discussion</p>
            <div
              className={classes["comments-container"]}
              id="comments-container"
            >
              {open.comments.length ? (
                Object.values(open.comments).map(c => (
                  <Comment key={c.postedAt} comment={c} />
                ))
              ) : (
                <p className={classes["no-comments-text"]}>
                  *Be the first to start the discussion*
                </p>
              )}
            </div>
            <form
              onSubmit={addComment}
              className={classes["add-comment-container"]}
            >
              <InputField
                id="comment"
                name="comment"
                placeholder="Write comment here..."
                multiline
                rows={3}
                className={classes["comment-input"]}
                onChange={e => setComment(e.target.value)}
                value={comment}
              />
              <Button
                disabled={!comment.trim()}
                onClick={addComment}
                className={classes["submit-btn"]}
              >
                Send
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default withStyles(styles)(ViewQuestionModal);
