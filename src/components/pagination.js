import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/react-datatable-action';

class PaginationDatatable extends Component {

  // componentWillMount() {
  //   this.props.setNewPageNumberAction(1);
  // }

  handleSelect(eventKey) {
    console.log(eventKey);
    this.props.setNewPageNumberAction(eventKey);
    this.props.fetchLmDataAction(eventKey, this.props.pageSize);
  }
  render() {
    console.log(this.props.activePage);

    let items = 20;
    if (this.props.pageSize) {
      items = Math.ceil(parseInt(this.props.totalRecords) / this.props.pageSize);
    }

    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={items}
        maxButtons={5}
        activePage={this.props.activePage}
        onSelect={this.handleSelect.bind(this)} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activePage : state.datatable.page,
    pageSize : state.datatable.pageSize,
    totalRecords : state.datatable.totalRecords
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPageNumberAction :(pageno) => { dispatch(actions.setNewPageNumberAction(pageno)); },
    setTotalNumberOfRecords : () => { dispatch(actions.setTotalNumberOfRecords()); },
    fetchLmDataAction : (page, limit) => { dispatch(actions.fetchLmDataAction(page, limit)); },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationDatatable);
