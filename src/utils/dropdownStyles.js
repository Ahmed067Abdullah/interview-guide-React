const dropdownStyles = {
  container: provided => ({
    ...provided,
    margin: "15px 0 9px",
  }),
  valueContainer: provided => ({
    ...provided,
    height: "56px",
    cursor: "text",
  }),
  clearIndicator: provided => ({
    ...provided,
    cursor: "pointer",
  }),
  dropdownIndicator: provided => ({
    ...provided,
    cursor: "pointer",
  }),
  menu: provided => ({
    ...provided,
    zIndex: 10,
  }),
  option: provided => ({
    ...provided,
    cursor: "pointer",
  }),
};

export default dropdownStyles;
