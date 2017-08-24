import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ModalDatatable from './partialComponents/modal';
import * as actions from '../actions/react-datatable-action';

class Rows extends Component {
  render() {
    const rows = [];
    if (this.props.data.length === 0) {
      rows.push(<tr><td> No records Found </td></tr>);
    } else {
      this.props.data.map((singleRow) => {
        let td = [];
        this.props.header.map((singleTD) => {
          td.push(<td>{singleRow[singleTD.dbfeild]}</td>);
        });

        rows.push(<tr>{ td }</tr>);
      });
    }
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalState : state.datatable.modalState,
    header : state.datatable.headers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setShowModalStateAction :(modalState) => { dispatch(actions.setShowModalStateAction(modalState)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Rows);
