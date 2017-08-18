import superAgent from 'superagent';
//import { replace, push } from 'react-router-redux';
import { ALERT_OPEN } from './global';


export const API_START = 'api/API_START';
export const API_END   = 'api/API_END';
export const API_RESET = 'api/API_RESET';

const initialState = {
  state: 'IDLE',
  error: null,
  result: null,
  code: 200
};

// Reducer
export default ( state = initialState, action ) => {
  switch( action.type ) {
    case API_START:
      return {
	...state,
	state: 'FETCHING',
	error: null
      };
      
    case API_END:
      return {
	...state,
	state: ( action.err ? 'ERROR' : 'SUCCESS' ),
        result: action.result,
        error: ( action.err ? action.err.message : null ),
        code: ( action.err && action.err.code ? action.err.code : 400 )
      };

    case API_RESET:
      return {
	...state,
	state: 'IDLE',
	error: null,
	code: 200
      };
      
    default:
      return state;
  }
}

// Action creators

// import * as apiActions from 'actions/apiActions'
//
// dispatch( apiActions.apiCall({
//   path: '/auth/authenticate',
//   method: 'POST',
//   qs: { filter: JSON.stringify({ where: { id: user.id } }) },
//   json: { foo: "bar" },
//   successType: 'USER_SET', // <= action type of action to store result
//   failureType: ( err ) => { handle error }
// });
//

export const apiCall = ( request ) => {
  return dispatch => {
    dispatch({ type: API_START });
    let { method, path, qs, json, successType, failureType } = request;
    superAgent( method, path )
      .set('Accept', 'application/json')
      .query( qs )
          .send( json )
          .end( (err, result ) => {
            let e = null;
            if ( err ) {
	      if ( result.statusCode == 404 ) {
		e = {
		  code: 404,
		  message: result.error.message
		};
	      }
	      else {
		e = {
                  code: result.statusCode || 400,
                  message: result.text || result.statusText || 'unknown'
		};
	      }
            }
            dispatch({ type: API_END, err: e, result: result.body });
            if ( ! err ) {
              if ( successType ) {
                if ( typeof successType === 'function' ) successType( result.body );
                else dispatch({ type: successType, data: result.body });
              }
              //if ( result.body && result.body.id && result.body.password_expired ) {
              //  dispatch( replace( '/expired' ) );
              //}
              //if ( result.body && result.body.session && ( result.body.session.expire != undefined ) ) {
              //   IdleTimeout.resetIdleTime( result.body.session.expire - 35 );
	      //}
              return;
            }
            if ( failureType ) {
              if ( typeof failureType === 'function' ) failureType( e );
              else dispatch({ type: failureType, code: e.code, message: e.message });
            }
            // check for http status code.  if 401 or 403, then dispatch to
            // an authentication failed action, which should change some state
            // which will cause a modal dialog to appear ( defined in MasterPage? )
            // letting use know their session expired?  upon 'ok', bounce them to the
            // login page.  successful login should direct them back to the page they were
            // on.
            //if ( e.code == 401 ) dispatch({ type: 'USER_UNSET' }); // this will force a logout
            //else
	    if ( ! failureType ) dispatch({ type: ALERT_OPEN, title: 'Error', message: e.code + ': ' + e.message });
          });
  };
}

export const apiStart = () => {
  return dispatch => {
    dispatch({ type: API_START });
  }
}

export const apiEnd = ( err ) => {
  return dispatch => {
    dispatch({
      type: API_END,
      err: err
    });
  }
}

export const apiReset = () => {
  return dispatch => {
    dispatch({ type: API_RESET });
  }
}
