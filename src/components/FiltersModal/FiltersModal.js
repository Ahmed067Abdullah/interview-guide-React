import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { Formik } from "formik";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import styles from "./FiltersModal.styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Select from "../Select/Select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FiltersModal = ({ classes, open, handleClose, setFilters }) => {
  const [interviewType, setInterviewType] = useState("All");

  const renderInfoText = text => <p className={classes["info-text"]}>{text}</p>;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const clearFilters = () => {
    setFilters({
      text: "",
      company: "",
      position: "",
      tags: "",
      type: "",
    });
    handleClose(false);
  };

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
      <div className={classes["container"]}>
        <p className={classes["heading"]}>Filters</p>
        <IconButton
          className={classes["close-icon"]}
          aria-label="close"
          onClick={() => handleClose(false)}
        >
          <ClearIcon />
        </IconButton>
        <Formik
          initialValues={{
            text: "",
            company: "",
            position: "",
            tags: "",
          }}
          onSubmit={({ text, company, position, tags }) => {
            setFilters({
              text: text.trim(),
              company: company.trim(),
              position: position.trim(),
              tags: tags.trim(),
              type: interviewType,
            });
            handleClose(false);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: "95%" }}>
              <InputField
                id="text"
                name="text"
                label="Text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
              />
              {renderInfoText(
                "Text in question/answer"
              )}
              <InputField
                id="company"
                name="company"
                label="Company"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company}
              />
              <InputField
                id="position"
                name="position"
                label="Position"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.position}
              />
              {renderInfoText(
                "e.g React intern, back end developer, QA, designer, etc"
              )}
              <div className={classes["interview-type-container"]}>
                <Select
                  label="Interview Type"
                  handleChange={e => setInterviewType(e.target.value)}
                  value={interviewType}
                  options={[
                    { label: "All", value: "All" },
                    { label: "Technical", value: "Technical" },
                    { label: "HR", value: "HR" },
                  ]}
                />
              </div>
              <InputField
                id="tags"
                name="tags"
                label="Tags"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tags}
              />
              {renderInfoText(
                "e.g: OOP, datastructures, javascript, polymorphism, etc"
              )}
              <div className={classes["btns-container"]}>
                <Button
                  color="secondary"
                  onClick={clearFilters}
                  className={classes["submit-btn"]}
                >
                  Clear
                </Button>
                <Button type="submit" className={classes["submit-btn"]}>
                  Apply
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
};

export default withStyles(styles)(FiltersModal);
