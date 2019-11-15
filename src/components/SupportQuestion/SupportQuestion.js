import React, { useState } from "react";
import Button from "../Button/Button";
import CreatableSelect from "react-select/creatable";
import styles from "./SupportQuestion.styles";
import dropdownStyles from "../../utils/dropdownStyles";
import { withStyles } from "@material-ui/core/styles";

const SupportQuestion = ({
  classes,
  toggleSupporting,
  supporting,
  defaultCompanies,
  defaultPositions,
}) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  return (
    <div className={classes["support-container"]}>
      {supporting ? (
        <div>
          <CreatableSelect
            isClearable
            onChange={setCompany}
            placeholder="Company"
            options={defaultCompanies}
            styles={dropdownStyles}
            value={company}
          />
          <CreatableSelect
            isClearable
            onChange={setPosition}
            options={defaultPositions}
            placeholder="Position"
            styles={dropdownStyles}
            value={position}
          />
          <div className={classes["support-action-container"]}>
            <Button
              color="secondary"
              onClick={() => toggleSupporting(false)}
              className={classes["cancl-btn"]}
            >
              Cancel
            </Button>
            <Button
              disabled={!(position && company)}
              onClick={() => toggleSupporting(false)}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => toggleSupporting(true)}>
          I was also asked this question
        </Button>
      )}
    </div>
  );
};

export default withStyles(styles)(SupportQuestion);
