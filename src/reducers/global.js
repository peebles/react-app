export const ALERT_OPEN = 'global/ALERT_OPEN';
export const ALERT_CLOSE = 'global/ALERT_CLOSE';
export const NOTIFICATION = 'global/NOTIFICATION';

const initialState = {
  alertOpen: false,
  alertTitle: 'Alert',
  alertMessage: '',
  alertSize: null,
};

export default ( state = initialState, action ) => {
  switch( action.type ) {
    case ALERT_OPEN:
      return {
	...state,
	alertTitle: action.title,
	alertMessage: action.message,
	alertSize: action.size,
	alertOpen: true
      };
      
    case ALERT_CLOSE:
      return {
	...state,
	alertOpen: false
      };

    case NOTIFICATION:
      let severity;
      switch( action.code ) {
	case 500:
	  severity = 'error';
	  break;
	case 200:
	  severity =  'info';
	  break;
	default:
	  severity = 'warning';
      }
      // Operate directly on the toastr, no need for state changes
      window.toastr[ severity ]( action.message );
      return state;

    default:
      return state;
  }
};

export const globalAlertOpen = ( title, message, size ) => {
  return dispatch => {
    dispatch({ type: ALERT_OPEN, title, message, size });
  }
};

export const globalAlertHide = () => {
  return dispatch => {
    dispatch({ type: ALERT_CLOSE });
  }
};

export const globalNotification = ( code, message ) => {
  return dispatch => {
    dispatch({ type: NOTIFICATION, code, message });
  }
};

// Using the global alert and notification system
//
// import { globalAlertOpen, globalNotification } from '../../reducers/global';
//
// ...
// this.props.globalAlertOpen( 'title', 'message' );
// this.props.globalNotification( code (200||403||500), 'message' );
// ...
//
// const mapDispatchToProps = ( dispatch ) => bindActionCreators({
//   globalAlertOpen,
//   globalNotication
// }, dispatch );
//
