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

import { apiCall } from '../../reducers/api';

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
	<button className="btn btn-primary" onClick={ () => props.apiCall( successOptions ) }>Call Success</button>
	<button className="btn btn-warning" onClick={ () => props.apiCall( fallbackOptions ) }>Call Fallback</button>
	<button className="btn btn-danger" onClick={ () => props.apiCall( errorOptions ) }>Call Error</button>
	<button className="btn btn-danger" onClick={ () => props.apiCall( exceptionOptions ) }>Call Exception</button>
      </div>
    
    </div>
  );
}

const mapStateToProps = (state, currentProps) => {
  return {
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
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
