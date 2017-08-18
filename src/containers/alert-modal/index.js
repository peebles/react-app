import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { globalAlertHide } from '../../reducers/global';

const AlertModal = ( props ) => {
  return(
    <Modal
        className="global-alert-modal"
	bsSize={props.size}
        show={props.show}
        onHide={props.hide}
        aria-labelledby="ModalHeader">
      <Modal.Header closeButton>
        <Modal.Title id='ModalHeader'>{props.title || 'Alert'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
	<Button onClick={props.hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = ( state ) => {
  return {
    show: state.global.alertOpen,
    size: state.global.alertSize,
    title: state.global.alertTitle,
    body: state.global.alertMessage
  };
}

const mapDispatchToProps = ( dispatch ) => bindActionCreators({
  hide: globalAlertHide
}, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( AlertModal );
