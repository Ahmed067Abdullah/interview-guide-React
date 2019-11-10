import colors from "../../utils/colors";

const styles = {
  container: {
    position: "relative",
    padding: "0px 0px 10px",
  },
  "close-icon": {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  heading: {
    color: colors.primay,
    fontWeight: 500,
    fontSize: 24,
    margin: "10px 20px",
  },
  "content-container": {
    marginTop: "0px",
    "& > div": {
      marginTop: "-15px",
    },
  },
  divider: {
    height: "1px",
    background: colors.borderColor,
    margin: "-15px 20px 0px",
  },
  "comments-container": {
    margin: "0 20px !important",
    maxHeight: '450px',
    overflow: 'auto'
  },
  "no-comments-text": {
    color: colors.textColor,
    fontSize: '14px',
    margin: '5px 0 15px',
    textAlign: 'center'
  },
  'add-comment-container': {
    display : "flex",
    flexDirection: "column"
  },
  "comment-input": {
    margin: "20px 20px 0px",
  },
  "submit-btn": {
    width: "120px",
    margin: "10px 20px 10px auto",
  },
};

export default styles;
