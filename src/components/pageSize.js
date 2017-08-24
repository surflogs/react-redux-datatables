import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/react-datatable-action';

class PageSizeDatatable extends Component{

  handleSelect(eventKey, event) {
    console.log(eventKey);
    this.props.setNewPageSizeAction(eventKey);
  }
  render() {

    let title = 'page size';
    if (this.props.pageSize) {
      title = this.props.pageSize;
    }

    const options = [];
    this.props.page.map((singlePage) => {
      options.push(<MenuItem eventKey= { singlePage } > { singlePage } </MenuItem>);
    });
    return (
      <DropdownButton bsSize="large" title={ title } onSelect={this.handleSelect.bind(this)}>
        {options}
      </DropdownButton>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageSize : state.datatable.pageSize
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPageSizeAction :(pageSize) => { dispatch(actions.setNewPageSizeAction(pageSize)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageSizeDatatable);
