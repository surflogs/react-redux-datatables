import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/react-datatable-action';

const menuItems = [{
  viewName : 'Amazon VOI',
  value : '17'
},
{
  viewName : 'Amazon',
  value : '8'
}];

class DropDownFilterDatatable extends Component {

  render() {

    const options = [];
    menuItems.map((singleOption) => {
      options.push(<MenuItem id={this.props.keyData} key={singleOption.value} eventKey={singleOption.value}>{singleOption.viewName}</MenuItem>);
    });

    return (
      <div>
        <DropdownButton onSelect={this.props.onClick.bind(this)} key={this.props.key} bsSize='large' title='ChannelId' >
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
