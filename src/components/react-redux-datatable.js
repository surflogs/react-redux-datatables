import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import Headers from './Build-headers';
import Rows from './Build-rows';
import PaginationDatatable from './pagination';
import PageSizeDatatable from './pageSize';
import * as actions from '../actions/react-datatable-action';

class ReactDatatable extends Component {
  componentWillMount() {
    // this.props.fetchSKUDataAction();
    const filter = {};
    this.props.setNewPageNumberAction(1);
    this.props.setNewPageSizeAction(10);
    this.props.fetchHeadersAction();
    this.props.setTotalNumberOfRecords(JSON.stringify(filter));
    const orderBy= {};
    orderBy['chid']= 1;

    this.props.fetchLmDataAction(1, 10, JSON.stringify(orderBy));
  }

  render() {
    let rows = [];
    if (this.props.rows) {
      rows = this.props.rows.respData;
    } else {
      rows = [];
    }

    let pages = [];
    if (this.props.pageSize) {
      pages = this.props.pageSize;
    } else {
      pages = [10, 25, 50, 100];
    }

    return (
        <Table striped bordered condensed hover height='10px' width='90%'>
          <Headers headerConfig={this.props.headers}/>
          <Rows data={rows}/>
          <tbody>
            <tr id="footer">
              <td colSpan="5"><PaginationDatatable/></td>
              <td></td>
              <td>Showing {((this.props.activePage - 1)  * this.props.pageSize) + 1} to {(((this.props.activePage - 1)  * this.props.pageSize)) + (this.props.rows ? rows.length : 0)} of { this.props.totalRecords } entries</td>
              <td></td>
              <td></td>
              <td></td>
              <td><PageSizeDatatable page={pages}/></td>
            </tr>
          </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    headers : state.datatable.headers,
    rows : state.datatable.rows,
    activePage : state.datatable.page,
    pageSize : state.datatable.pageSize,
    totalRecords : state.datatable.totalRecords
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSKUDataAction :(skuname) => { dispatch(actions.fetchSKUDataAction(skuname)); },
    fetchLmDataAction : (page, limit, orderBy) => { dispatch(actions.fetchLmDataAction(page, limit, orderBy)); },
    fetchHeadersAction : () => { dispatch(actions.fetchHeadersAction()); },
    setTotalNumberOfRecords : (filter) => { dispatch(actions.setTotalNumberOfRecords(filter)); },
    setNewPageNumberAction :(pageno) => { dispatch(actions.setNewPageNumberAction(pageno)); },
    setNewPageSizeAction :(pageSize) => { dispatch(actions.setNewPageSizeAction(pageSize)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReactDatatable);
