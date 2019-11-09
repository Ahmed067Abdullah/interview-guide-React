import colors from "../../utils/colors";

const styles = {
  'container': {
    backgroundColor: colors.primay,
    padding: '0 10px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% - 20px)'
  },
  'navbar-action': {
    color: colors.white,
    padding: '5px 10px 6px',
    margin: '0 5px',
    fontSize: '14px',
    border: `1px solid ${colors.bgColor}`,
    borderRadius: '6px',
    cursor: 'pointer',
    position: 'relative'
  },
  'filters-symbol': {
    position: 'absolute',
    height: '10px',
    width: '10px',
    background: colors.bgColor,
    borderRadius:'50%',
    top: '-3px',
    right: '-4px',
  }
};

export default styles;
