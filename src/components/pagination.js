import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/react-datatable-action';

class PaginationDatatable extends Component {
  getInitialState() {
    return {
      activePage: 1
    };
  }

  handleSelect(eventKey) {
    console.log(eventKey);
    this.props.setNewPageNumberAction(eventKey);
  }
  render() {
    console.log(this.props.activePage);
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={20}
        maxButtons={5}
        activePage={this.props.activePage}
        onSelect={this.handleSelect.bind(this)} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activePage : state.datatable.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPageNumberAction :(pageno) => { dispatch(actions.setNewPageNumberAction(pageno)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaginationDatatable);
