import colors from "../../utils/colors";

const styles = {
  container: {
    position: "relative",
    paddingTop: "50px",
  },
  "questions-container": {
    width: "80%",
    minWidth: "340px",
    maxWidth: "1000px",
    margin: "0 auto",
    // marginTop: '70px'
  },
  "main-loader-container": {
    height: "calc(100vh - 70px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: colors.textColor,
    fontWeight: 500,
  },
  "count-text": {
    color: colors.textColor,
    fontSize: "16px",
    textAlign: "center",
    "& > span": {
      fontWeight: 500,
    },
  },
  "up-arrow": {
    position: "fixed",
    bottom: 40,
    right: 40,
    "& > span": {
      color: colors.primay,
    },
    "@media(max-width:600px)": {
      bottom: 20,
      right: 20,
      backgroundColor: "rgba(0, 0, 0, 0.08) !important",
    },
  },
  "all-scroll-msg": {
    textAlign: "center",
    fontSize: "20px",
    color: colors.textColor,
    fontWeight: 500,
  },
};

export default styles;
