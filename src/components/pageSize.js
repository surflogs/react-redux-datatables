import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/react-datatable-action';

class PageSizeDatatable extends Component{

  // componentWillMount() {
  //   this.props.setNewPageSizeAction(this.props.page[0])
  // }

  handleSelect(eventKey, event) {
    console.log(eventKey);
    this.props.setNewPageSizeAction(eventKey);
    this.props.fetchLmDataAction(this.props.activePage, eventKey)
  }
  render() {

    let title = 'page size';
    if (this.props.pageSize) {
      title = this.props.pageSize;
    }

    const options = [];
    if (this.props.page){
      this.props.page.map((singlePage) => {
        options.push(<MenuItem key= {singlePage} eventKey= { singlePage } > { singlePage } </MenuItem>);
      });
    }
    return (
      <DropdownButton id ='pagesizeDropdown' bsSize="large" title={ title } onSelect={this.handleSelect.bind(this)}>
        {options}
      </DropdownButton>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageSize : state.datatable.pageSize,
    activePage : state.datatable.page
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewPageSizeAction :(pageSize) => { dispatch(actions.setNewPageSizeAction(pageSize)); },
    fetchLmDataAction : (page, limit) => { dispatch(actions.fetchLmDataAction(page, limit)); },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageSizeDatatable);
