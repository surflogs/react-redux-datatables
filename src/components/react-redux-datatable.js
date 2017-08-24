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
    this.props.fetchSKUDataAction();
    this.props.fetchHeadersAction();
    // this.props.fetchPmDataAction();
  }

  render() {
    let rows = [];
    if (this.props.rows) {
      rows = this.props.rows;
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
        <Table>
          <Headers headerConfig={this.props.headers}/>
          <Rows data={rows}/>
            <tr>
              <td><PaginationDatatable/></td>
              <td></td>
              <td></td>
              <td><PageSizeDatatable page={pages}/></td>
            </tr>


      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    headers : state.datatable.headers,
    rows : state.datatable.rows
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSKUDataAction :(skuname) => { dispatch(actions.fetchSKUDataAction(skuname)); },
    fetchPmDataAction : () => { dispatch(actions.fetchPmDataAction()); },
    fetchHeadersAction : () => { dispatch(actions.fetchHeadersAction()); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReactDatatable);
