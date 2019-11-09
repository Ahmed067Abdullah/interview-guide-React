import colors from "../../utils/colors";

const styles = {
  container: {
    position: "relative",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  "close-icon": {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  heading: {
    color: colors.textColor,
    fontWeight: 500,
    fontSize: 24,
    margin: "10px 0",
  },
  "info-text": {
    color: colors.textColor,
    fontSize: 12,
    margin: "-7px 0 0 5px",
  },
  "error-text": {
    color: colors.error,
    fontSize: 12,
    margin: "-4px 17px 7px",
  },
  "interview-type-container": {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    marginBottom: "-10px",
    "& > span": {
      marginRight: "10px",
      marginBottom: "5px",
      color: colors.textColor,
      fontWeight: 500,
    },
  },
  label: {
    "& span": {
      fontSize: "14px",
    },
  },
  "submit-btn": {
    width: "100%",
    marginTop: "10px",
  },
};

export default styles;
