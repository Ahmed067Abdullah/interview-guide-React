import colors from "../../utils/colors";

const styles = {
  "question-container": {
    "&:hover": {
      boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.31)'
    },
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    borderRadius: "6px",
    padding: "10px 20px",
    margin: "15px 0",
    transition: '0.3s linear'
  },
  question: {
    margin: "5px 0",
    fontSize: "18px",
    color: colors.textColor,
    wordBreak: "break-word",
    "& >span": {
      fontWeight: "500",
      whiteSpace: "pre-wrap"
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
    "& > .fa-check": {
      color: colors.success,
    },
    "& > .fa-times": {
      color: colors.error,
    },
  },
  "question-info": {
    "@media(max-width:600px)": {
      flexDirection: "column",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  "submit-btn": {
    marginLeft: "auto",
    "@media(max-width:600px)": {
      width: "100%",
      marginTop: "5px",
    },
    "& span": {
      textTransform: "none",
    },
    "& i": {
      marginLeft: "5px",
      fontSize: "12px"
    },
  },
};

export default styles;
