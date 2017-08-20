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
