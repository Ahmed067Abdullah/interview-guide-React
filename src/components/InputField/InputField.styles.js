import colors from "../../utils/colors";

const styles = {
  "default-class-text-field": {
    display: "block",
    "& > div": {
      width: "100%",
    },
  },
  "password-field": {
    marginTop: "13px"
  },
  error: {
    color: `${colors.error} !important`,
  },
};

export default styles;
