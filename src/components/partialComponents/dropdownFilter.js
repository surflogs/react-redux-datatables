import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/react-datatable-action';

class DropDownFilterDatatable extends Component {

  render() {
    let title = '';
    if (this.props.title) {
      title = this.props.title;
    }
    const options = [];
    for (const key in this.props.menuItems) {
      if (this.props.filters) {
        if (key === this.props.filters[this.props.keyData]) {
          title = this.props.menuItems[key];
        }
      }
      options.push(<MenuItem id={this.props.keyData} key={key} eventKey={key}>{this.props.menuItems[key]}</MenuItem>);
    }
    console.log(title);
    return (
      <div>
        <DropdownButton onSelect={this.props.onClick.bind(this)} key={this.props.key} bsSize='large' title={title} >
          {options}
        </DropdownButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters : state.datatable.filters,
    pageSize : state.datatable.pageSize,
    sortColumn : state.datatable.sortColumn,
    sortOrder : state.datatable.sortOrder
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLmDataAction :(filter) => { dispatch(actions.fetchLmDataAction(filter)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DropDownFilterDatatable);
