## Dynamic Classnames

See [classnames](https://github.com/JedWatson/classnames).

```javascript
  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });

    return <button className={btnClass}>I'm a button!</button>;
  }
```

## Alerts and Notifications

```javascript
import { globalAlertOpen, globalNotification } from '../../reducers/global';

  // ...
  props.globalAlertOpen( 'title', 'message' );
  props.globalNotification( code (200||403||500), 'message' );
  // ...

const mapDispatchToProps = ( dispatch ) => bindActionCreators({
  globalAlertOpen,
  globalNotication
}, dispatch );
```

## APIs

```javascript
import { apiCall } from '../../reducers/api';

const MyView = (props) => {

  const handleSuccessCB = {
    path: '/test/success',
    method: 'POST',
    json: { email: 'aqpeeb@gmail.com' },
    successType: ( result ) => { props.globalAlertOpen( 'Success', JSON.stringify( result, null, 2 ) ); }
  };

  const handleSuccessACTION = {
    path: '/test/success',
    method: 'POST',
    json: { email: 'aqpeeb@gmail.com' },
    successType: 'SOME_ACTION_TYPE'
  };

  return(
    <div>
      <button onClick={ () => props.apiCall( handleSuccessOptions ) }>Try Something</a>
      <button onClick={ () => props.apiCall( handleSuccessACTION ) }>Try Something</a>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  globalAlertOpen,
  apiCall,
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MyView);
```

See `./src/containers/home/index.js` for more extensive examples.

## Other Things to Look At

As a possible alternative to thunks, see [this](https://github.com/ericclemmons/react-resolver).

For initializing the redux state from the server, see [this](https://github.com/KELiON/redux-async-initial-state).

For an alternative to defining endpoints for everything, and instead making
what looks like a big javascript object available over the network, check
out [Falcor](https://netflix.github.io/falcor/starter/why-falcor.html) and
using this with [redux](https://github.com/ekosz/redux-falcor).
