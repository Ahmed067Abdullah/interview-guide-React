import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Questions.styles";

const Questions = ({}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // apply listener here, also deal with loading variable
  }, [])

  return (
    <div>
      <Navbar />
      Questions
    </div>
  );
};

export default withStyles(styles)(Questions);
