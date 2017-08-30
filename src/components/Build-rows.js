import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, tbody } from 'react-bootstrap';
import * as actions from '../actions/react-datatable-action';
import * as components from '../components/partialComponents/index';
// import inputBoxQty from '../components/partialComponents/inputBoxQty'
import ModalDatatable from '../components/partialComponents/modal';
import ExpandCollapse from '../components/partialComponents/expandCollapse';

function mapCellTypeToComponent(Component, val, dataTosend, trigger) {
  let c;
  switch (Component) {
    case 'inputBoxQty':
      c = <FormControl type="text" value={val}/>;
      break;
    case 'modal':
      c = <ModalDatatable />;
      break;
    case 'expandable':
      console.log(" sending this data to component" + dataTosend);
      c = <ExpandCollapse data={ dataTosend } triggerData={trigger}/>;
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
      rows.push(<tr key="empty"><td> No records Found </td></tr>);
    } else {
      this.props.data.map((singleRow) => {
        const td = [];
        this.props.header.map((singleTD) => {
          if (singleTD.celltype === 'Component') {
            td.push(<td>{mapCellTypeToComponent(singleTD.cellvalue, singleRow[singleTD.dbfeild], singleRow.bundeldetail, singleRow.sku)}</td>);
          } else {
            td.push(<td>{singleRow[singleTD.dbfeild]}</td>);
          }
        });

        rows.push(<tr id={singleRow.dbfeild}>{ td }</tr>);
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
