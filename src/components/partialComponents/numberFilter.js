import React, { Component } from 'react';
import { DropdownButton, MenuItem, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/react-datatable-action';

const operators = [{
  viewName : '=',
  value : 'eq'
}, {
  viewName : '>',
  value : 'gt'
}, {
  viewName : '<',
  value : 'lt'
}, {
  viewName : '>=',
  value : 'gte'
}, {
  viewName : '<=',
  value : 'lte'
}];

 const txtBox = {
   background : 'white',
   width : '50%',
   height : '60px'
 };
class NumberFilterDatatable extends Component {

  render() {

    const options = [];
    operators.map((singleOption) => {
      options.push(<MenuItem id={this.props.keyData} key={singleOption.value} eventKey={singleOption.value}>{singleOption.viewName}</MenuItem>);
    });

    return (
      <div>
        <div>
        <DropdownButton key={this.props.key} bsSize='large' title='Operator' >
          {options}
        </DropdownButton>
        <FormControl onBlur={this.props.onBlur.bind(this)} style={txtBox} id={this.props.keyData} className="form-control" type="text" />
        </div>
        <div>

        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NumberFilterDatatable);
