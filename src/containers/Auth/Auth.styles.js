import colors from "../../utils/colors";

const styles = {
    'auth-container': {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    'auth-card': {
      '@media(max-width:768px)': {
        width: '95%',
        minWidth: '95%'
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor : colors.white,
      borderRadius: '6px',
      width: '30%',
      minWidth: '500px',
      maxWidth: '800px',
      marginBottom: '50px'
    },
    'main-heading': {
      color: colors.textColor,
      fontSize: '30px',
      fontWeight: '500',
      margin: '5px 0 10px'
    },
    'error-text': {
      margin: 0,
      fontSize: '14px',
      color: colors.error
    },
    'toggle-text': {
      color: colors.textColor,
      fontSize: '14px',
    }, 
    'toggle-link': {
      cursor: 'pointer',
      marginLeft: '5px',
      fontWeight: '500'
    },
    'submit-btn': {
      width: '100%',
      marginTop: '10px'
    }
  };
  
  export default styles;
  