import colors from "../../utils/colors";

const styles = {
  "question-container": {
    backgroundColor: colors.white,
    borderRadius: "6px",
    padding: "10px 20px",
    margin: "15px 0",
  },
  question: {
    margin: "5px 0",
    fontSize: "18px",
    color: colors.textColor,
    wordBreak: "break-word",
    "& >span": {
      fontWeight: "500",
    },
  },
  "small-text": {
    margin: "5px 0",
    color: colors.textColor,
    fontSize: "14px",
    "& >span": {
      fontWeight: "500",
      marginLeft: "5px",
      wordBreak: "break-word",
    },
  },
  "normal-text": {
    margin: "5px 0",
    color: colors.textColor,
    wordBreak: "break-word",
    "& >span": {
      fontWeight: "500",
      marginRight: "5px",
    },
  },
  "question-info": {
    "@media(max-width:600px)": {
      flexDirection: "column",
    },
    display: "flex",
    justifyContent: "space-between",
  },
};

export default styles;
