import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import * as actions from '../actions/react-datatable-action';
import * as components from '../components/partialComponents/index';
// import inputBoxQty from '../components/partialComponents/inputBoxQty'
import ModalDatatable from '../components/partialComponents/modal';

function mapCellTypeToComponent(Component, val) {
  let c;
  switch (Component) {
    case 'inputBoxQty':
      c = <FormControl type="text" value={val}/>;
      break;
    case 'modal':
      c = <ModalDatatable />;
      break;
    default:
      c = 'not able to find matching component';
      break;
  }
  return c;
}

class Rows extends Component {
  render() {
    const rows = [];
    if (this.props.data.length === 0) {
      rows.push(<tr><td> No records Found </td></tr>);
    } else {
      this.props.data.map((singleRow) => {
        let td = [];
        this.props.header.map((singleTD) => {
          if (singleTD.celltype === 'Component') {
            td.push(<td>{mapCellTypeToComponent(singleTD.cellvalue, singleRow[singleTD.dbfeild])}</td>);
            // td.push(<td><inputBoxQty /></td>);
          } else {
            td.push(<td>{singleRow[singleTD.dbfeild]}</td>);
          }
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
