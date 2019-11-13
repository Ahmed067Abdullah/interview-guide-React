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
  "all-scroll-msg": {
    textAlign: "center",
    fontSize: "20px",
    color: colors.textColor,
    fontWeight: 500,
  },
};

export default styles;
