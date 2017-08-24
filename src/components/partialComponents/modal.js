import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/react-datatable-action';

class ModalDatatable extends Component {
  componentWillMount() {
    this.props.setShowModalStateAction(false);
  }

  open() {
    this.props.setShowModalStateAction(true);
  }
  close() {
    this.props.setShowModalStateAction(false);
  }

  render() {

    let status;
    if (this.props.modalState) {
      status = this.props.modalState;
    } else {
      status = false;
    }
    return (
      <div>
      <Button
    bsStyle="primary"
    bsSize="large"
    onClick={this.open.bind(this)}
  >
    Launch demo modal
  </Button>
  { this.props.modalState ?
      <Modal.Dialog show={status} onHide={this.close} >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal.Dialog>
      : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalState : state.datatable.modalState
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setShowModalStateAction :(modalState) => { dispatch(actions.setShowModalStateAction(modalState)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDatatable);
