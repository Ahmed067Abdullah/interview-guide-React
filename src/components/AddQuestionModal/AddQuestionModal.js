import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { Formik } from "formik";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import styles from "./AddQuestionModal.styles";
import { withStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddQuestionModal = ({ classes, open, handleClose }) => {
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    if(loading) return;
    handleClose(false);
  }

  const renderInfoText = text => <p className={classes["info-text"]}>{text}</p>;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      // keepMounted
      fullWidth
      maxWidth="sm"
      // onClose={closeModal}
    >
      <div className={classes["container"]}>
        <p className={classes["heading"]}>Share Question</p>
        {renderInfoText(
          "Please make sure that similar question isn't already shared"
        )}
        <IconButton
          className={classes["close-icon"]}
          aria-label="close"
          onClick={closeModal}
        >
          <ClearIcon />
        </IconButton>
        <Formik
          initialValues={{
            question: "",
            company: "",
            answer: "",
            links: "",
            position: "",
            tags: "",
          }}
          validate={values => {
            const errors = {};
            if (!values.question.trim()) {
              errors.question = "Required";
            }
            if (!values.company.trim()) {
              errors.company = "Required";
            }
            if (!values.position.trim()) {
              errors.position = "Required";
            }
            if (!values.tags.trim()) {
              errors.tags = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // const { name, email, password } = values;
            // setLoading(true);
            // callSignin({ email, password }, history).catch(err => {
            //   setErrorSignin(err);
            //   setLoading(false);
            // });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                pointerEvents: loading ? "none" : "",
              }}
            >
              <InputField
                id="question"
                name="question"
                label="Question"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.question}
                error={touched.question && errors.question}
              />
              <InputField
                id="company"
                name="company"
                label="Company"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company}
                error={touched.company && errors.company}
              />
              <InputField
                id="answer"
                name="answer"
                label="Answer"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.answer}
                error={touched.answer && errors.answer}
              />
              {renderInfoText("Only share answer if you are sure about it")}
              <InputField
                id="links"
                name="links"
                label="Useful Links"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.links}
                error={touched.links && errors.links}
              />
              {renderInfoText(
                "Related references to Stack Overflow, Youtube, Wikipedia, etc"
              )}
              <InputField
                id="position"
                name="position"
                label="Position"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.position}
                error={touched.position && errors.position}
              />
              {renderInfoText(
                "e.g Front end developer, back end developer, QA, etc"
              )}
              <InputField
                id="tags"
                name="tags"
                label="Tags"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tags}
                error={touched.tags && errors.tags}
              />
              {renderInfoText(
                "Tags would help others to quickly filter related questions. E.g: Data Structures, OOP, Javascript, Polymorphism, etc"
              )}
              <Button
                type="submit"
                disabled={loading}
                className={classes["submit-btn"]}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default withStyles(styles)(AddQuestionModal);
