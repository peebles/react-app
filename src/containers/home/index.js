import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../reducers/counter';
import { globalAlertOpen, globalNotification } from '../../reducers/global';
import {
  apiCall,
  API_STATE_FETCHING,
  API_STATE_ERROR,
  API_STATE_SUCCESS } from '../../reducers/api';

import Classnames from 'classnames';

const Home = props => {
  // For testing api calls
  const successOptions = {
    path: '/test/success',
    method: 'POST',
    json: { email: 'aqpeeb@gmail.com' },
    successType: ( result ) => { props.globalAlertOpen( 'Success', JSON.stringify( result, null, 2 ) ); }
  };

  const fallbackOptions = {
    path: '/test/fallbacks',
    method: 'POST',
    json: { email: 'aqpeeb@gmail.com' },
    successType: ( result ) => { props.globalAlertOpen( 'Success', JSON.stringify( result, null, 2 ) ); }
  };

  const errorOptions = {
    path: '/test/errors',
    method: 'POST',
    json: {},
    successType: ( result ) => { props.globalAlertOpen( 'Success', JSON.stringify( result, null, 2 ) ); }
  };

  const exceptionOptions = {
    path: '/test/exceptions',
    method: 'POST',
    json: {},
    successType: ( result ) => { props.globalAlertOpen( 'Success', JSON.stringify( result, null, 2 ) ); }
  };

  const apiBtnClass = Classnames({
    'btn': true,
    'btn-disabled': ( props.apiState === API_STATE_FETCHING ),
    'btn-success':  ( props.apiState === API_STATE_SUCCESS ),
    'btn-danger':   ( props.apiState === API_STATE_ERROR ),
  });

  return (
    <div>
      <h1>Home</h1>
      <p>Count: {props.count}</p>
      
      <p>
	<button className="btn" onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
	<button className="btn" onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
      </p>
      
      <p>
	<button className="btn" onClick={props.decrement} disabled={props.isDecrementing}>Decrementing</button>
	<button className="btn" onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
      </p>
      
      <button onClick={() => props.changePage()}>Go to about page via redux</button>

      <div>
	<button className="btn" onClick={ () => props.globalAlertOpen('oops', 'something bad happened' ) }>Global Alert</button>
	<button className="btn" onClick={ () => props.globalAlertOpen('oops', 'something BIG happened', 'large' ) }>Big Global Alert</button>
      </div>
      
      <div>
	<button className="btn btn-primary" onClick={ () => props.globalNotification( 200, 'Informational' ) }>Info</button>
	<button className="btn btn-warning" onClick={ () => props.globalNotification( 400, 'Warning' ) }>Warning</button>
	<button className="btn btn-danger" onClick={ () => props.globalNotification( 500, 'Error' ) }>Error</button>
      </div>
      
      <div>
	<button className={apiBtnClass} onClick={ () => props.apiCall( successOptions ) }>Call Success</button>
	<button className={apiBtnClass} onClick={ () => props.apiCall( fallbackOptions ) }>Call Fallback</button>
	<button className={apiBtnClass} onClick={ () => props.apiCall( errorOptions ) }>Call Error</button>
	<button className={apiBtnClass} onClick={ () => props.apiCall( exceptionOptions ) }>Call Exception</button>
      </div>

      <p></p>
      { props.apiState !== API_STATE_ERROR  ? null :
	(
	  <div className={Classnames({
	      alert: true,
	      'alert-warning': ( props.apiErrorCode !== 500 ),
	      'alert-danger':  ( props.apiErrorCode === 500 )
	    })}>{props.apiErrorMessage}</div>
      ) }
    
    </div>
  );
}

const mapStateToProps = (state, currentProps) => {
  return {
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,

    apiState: state.api.state,
    apiResult: state.api.result,
    apiErrorMessage: state.api.error,
    apiErrorCode: state.api.code
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us'),

  globalAlertOpen,
  globalNotification,
  apiCall,
  
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);
