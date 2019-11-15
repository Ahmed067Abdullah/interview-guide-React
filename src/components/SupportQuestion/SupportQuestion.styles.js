const styles = {
  "support-container": {
    margin: "10px 20px 25px 20px !important",
    "@media(max-width:600px)": {
      "& > button": {
        width: "100%",
      },
    },
  },
  "support-action-container": {
    "@media(max-width:600px)": {
      display: "flex",
      "& > button": {
        flex: 1,
      },
    },
  },
  "cancl-btn": {
    marginRight: "7px",
  },
};

export default styles;
