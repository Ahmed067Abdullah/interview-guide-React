import colors from "../../utils/colors";

const styles = {
  "comment-container": {
    marginBottom: '5px'
  },
  "comment-text": {
    margin: "0",
    marginBottom: "-7px",
    color: colors.textColor,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    "& > span": {
      fontWeight: 500,
    },
  },
  "commented-at": {
    fontSize: "12px",
    fontWeight: 300,
    color: colors.textColor,
  },
  "submit-btn": {
    width: "100%",
    marginTop: "10px",
  },
};

export default styles;
