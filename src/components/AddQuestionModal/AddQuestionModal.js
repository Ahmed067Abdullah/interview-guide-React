import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { Formik } from "formik";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import styles from "./AddQuestionModal.styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CreatableSelect from "react-select/creatable";
import IGSnackbar from "../Snackbar/Snackbar";
import dropdownStyles from "../../utils/dropdownStyles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddQuestionModal = ({
  classes,
  defaultCompanies,
  defaultPositions,
  defaultTags,
  open,
  handleClose,
  addQuestion,
  user
}) => {
  const [loading, setLoading] = useState(false);
  const [interviewType, setInterviewType] = useState("Technical");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [tags, setTags] = useState([]);

  const closeModal = () => {
    if (loading) return;
    handleClose(false);
  };

  const renderInfoText = text => <p className={classes["info-text"]}>{text}</p>;

  const renderErrorText = text => (
    <p className={classes["error-text"]}>{text}</p>
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      fullScreen={fullScreen}
      maxWidth="sm"
      // onClose={closeModal}
    >
      <IGSnackbar
        message={snackbarText}
        open={showSnackbar}
        showSnackbar={setShowSnackbar}
      />
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
            answer: "",
            links: "",
            tags: ""
          }}
          validate={values => {
            const errors = {};
            if (!values.question.trim()) {
              errors.question = "Required";
            }
            if (!company) {
              errors.company = "Required";
            }
            if (!position) {
              errors.position = "Required";
            }
            if (!tags.length) {
              errors.tags = "Required";
            }
            return errors;
          }}
          onSubmit={values => {
            const apiData = { ...values };
            apiData.interviewType = interviewType;
            apiData.company = company.label;
            apiData.position = position.label;
            apiData.tags = tags.reduce((acc, t) => acc + `${t.label} `, "");
            apiData.createdAt = Date.now();
            apiData.createdBy = user.uid;
            apiData.createdByName = user.name;
            setLoading(true);
            addQuestion(
              apiData,
              company,
              defaultCompanies,
              position,
              defaultPositions,
              tags,
              defaultTags
            )
              .then(res => {
                setShowSnackbar("success");
                setSnackbarText("Question shared successfully!");
                values.question = "";
                values.answer = "";
                values.links = "";
              })
              .catch(err => {
                setShowSnackbar("error");
                setSnackbarText(err);
              })
              .finally(() => setLoading(false));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                pointerEvents: loading ? "none" : ""
              }}
            >
              <InputField
                id="question"
                name="question"
                label="Question"
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={2}
                value={values.question}
                error={touched.question && errors.question}
              />
              <CreatableSelect
                isClearable
                onChange={setCompany}
                placeholder="Company"
                options={defaultCompanies}
                styles={dropdownStyles}
                value={company}
              />
              {touched.company && errors.company && renderErrorText("Required")}
              {renderInfoText(
                "If your company is not listed then you can type it's name and create it. It would be available in the options once you submit the form"
              )}

              <CreatableSelect
                isClearable
                onChange={setPosition}
                options={defaultPositions}
                placeholder="Position"
                styles={dropdownStyles}
                value={position}
              />
              {touched.position &&
                errors.position &&
                renderErrorText("Required")}
              {renderInfoText(
                "If your position is not listed then you can create it by typing your position. It would be available in the options once you submit the form. E.g React intern, back end developer, QA, designer, etc"
              )}
              <div className={classes["interview-type-container"]}>
                <span>Interview Type: </span>
                <RadioGroup
                  row
                  aria-label="Interview Type"
                  name="type"
                  value={interviewType}
                  onChange={e => setInterviewType(e.target.value)}
                >
                  <FormControlLabel
                    value="Technical"
                    className={classes["label"]}
                    control={<Radio color="primary" />}
                    label="Technical"
                  />
                  <FormControlLabel
                    value="HR"
                    className={classes["label"]}
                    control={<Radio color="primary" />}
                    label="HR"
                  />
                </RadioGroup>
              </div>
              <InputField
                id="answer"
                name="answer"
                label="Answer"
                onChange={handleChange}
                multiline
                rows={3}
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
                "Related references to Stack Overflow, Youtube, Wikipedia, etc. You can provide multiple space separated links"
              )}
              <CreatableSelect
                isMulti
                isClearable
                onChange={setTags}
                options={defaultTags}
                placeholder="Tags"
                styles={dropdownStyles}
                value={tags}
              />
              {touched.tags && errors.tags && renderErrorText("Required")}
              {renderInfoText(
                "Tags would help others to quickly filter related questions. Please avoid making unncessary/repetitive tags"
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
