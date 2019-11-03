import colors from "../../utils/colors";

const styles = {
  'container': {
    backgroundColor: colors.primay,
    padding: '0 10px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  'navbar-action': {
    color: colors.white,
    padding: '5px 10px 6px',
    margin: '0 5px',
    fontSize: '14px',
    border: `1px solid ${colors.bgColor}`,
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default styles;
