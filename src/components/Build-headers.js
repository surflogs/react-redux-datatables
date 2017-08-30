import React, { Component } from 'react';
import { thead } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import * as actions from '../actions/react-datatable-action';
import DropDownFilterDatatable from './partialComponents/dropdownFilter';
import NumberFilterDatatable from '../components/partialComponents/numberFilter';

const txtBox = {
  background : 'white',
  width : '50%',
  height : '60px'
};

function mapCellTypeToComponent(Component, val, id, handler, text) {
  let c;
  switch (Component) {
    case 'dropdown':
      c = <DropDownFilterDatatable keyData={id} title={text} menuItems={val} onClick={ handler }/>;
      break;
    case 'textbox':
      c = <FormControl id={id} style={txtBox} title={text} className="form-control" type="text" onBlur={ handler } />;
      break;
    case 'number':
      c = <NumberFilterDatatable keyData={id} title={text} onBlur={ handler } />;
      break;
    default:
      c = '';
      break;
  }
  return c;
}

class Headers extends Component {

  fillData(columnName, order) {
    console.log(" called now ... ");
    const sortData = {};
    sortData[columnName] = order;
    const filter = {}
    this.props.fetchLmDataAction(this.props.activePage, this.props.pageSize, JSON.stringify(sortData), JSON.stringify(this.props.filters  ));
  }

  onSelect(eventKey, event) {
    const field = event.target.id;
    const value = eventKey;
    // this.props.fetchLmDataAction(1, this.props.pageSize, JSON.stringify(filter));
    // this.props.setNewFilterAction(filter);
    this.addFilterToState(field, value);
  }

  addFilterToState(field, value) {
    let filter = {};
    if (this.props.filters) {
      filter = this.props.filters;
    }
    if (value.length > 0) {
      filter[field] = value;
      this.props.setNewFilterAction(filter);
    }
    const orderBy = {};
    if (this.props.sortColumn) {
      orderBy[this.props.sortColumn] = this.props.sortOrder;
    }

    filter[field] = value;
    this.props.fetchLmDataAction(this.props.activePage, this.props.pageSize, JSON.stringify(orderBy), JSON.stringify(filter));
    this.props.setTotalNumberOfRecords(JSON.stringify(filter));
  }

  onBlurOfTextBox(event, eventKey) {
    let field;
    let value;
    let allFilters = {};
    if (this.props.filters) {
      allFilters = this.props.filters;
    }
    if (eventKey.target.id.length > 0) { // for dropdown in filter
      field = eventKey.target.id;
      value = event;
      if (value.length === 0) {
        console.log(" value is empty ");
        if (allFilters.hasOwnProperty(field)) {
          console.log(" removing key ");
          delete allFilters[field];
          // console.log(JSON.stringify(allFilters));
          this.props.setNewFilterAction(allFilters)
        }
      }
      this.addFilterToState(field, value);
    } else { // for textbox in filter
      field = event.target.id;
      value = event.target.value;
      if (value.length === 0) {
        console.log(" value is empty ");
        if (allFilters.hasOwnProperty(field)) {
          console.log(" removing key ");
          delete allFilters[field];
          this.props.setNewFilterAction(allFilters)

          // console.log(JSON.stringify(allFilters));
        }
      }
      this.addFilterToState(field, value);
    }
  }

  bindDbHandlerToHandler(handlerName) {
    let c;
    switch (handlerName) {
      case 'onSelect':
        c = this.onSelect.bind(this);
        break;
      case 'onBlurOfTextBox':
        c = this.onBlurOfTextBox.bind(this);
        break;
      default:
        c = '';
        break;
    }
    return c;
  }

  sort(name, event) {
    if (this.props.sortColumn) {
      if (this.props.sortColumn === name.target.id) {
        this.props.setSortColumnStateAction(name.target.id);
        if (this.props.sortOrder === -1) {
          this.props.setSortOrderStateAction(1);
          this.fillData(name.target.id, 1);
        } else {
          this.props.setSortOrderStateAction(-1);
          this.fillData(name.target.id, -1);
        }
      } else {
        this.props.setSortColumnStateAction(name.target.id);
        this.props.setSortOrderStateAction(1);
        this.fillData(name.target.id, 1);
      }
    } else {
      this.props.setSortColumnStateAction(name.target.id);
      Promise.resolve(this.props.setSortOrderStateAction(1)).then(
        this.fillData(name.target.id, 1)
      );
    }
  }

  render() {
    const headers = [];
    const filters = [];
    if (this.props.headerConfig) {
      this.props.headerConfig.map((header) => {
        const handler = this.bindDbHandlerToHandler(header.handler);
        headers.push(<th key = {header.dbfeild} id={header.dbfeild}>{header.headername}</th>);
        filters.push(<th key = {header.dbfeild} id={header.dbfeild}> {mapCellTypeToComponent(header.filtertype, header.filtervalue, header.dbfeild, handler, header.headername)} </th>);
      });
    }

    return (
      <thead>
        <tr>
          {filters}
        </tr>
        <tr onClick={this.sort.bind(this)} id='headers'>
        {headers}
      </tr>
      </thead>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sortColumn : state.datatable.sortColumn,
    sortOrder : state.datatable.sortOrder,
    activePage : state.datatable.page,
    pageSize : state.datatable.pageSize,
    filters : state.datatable.filters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortOrderStateAction :(order) => { dispatch(actions.setSortOrderStateAction(order)); },
    setSortColumnStateAction :(column) => { dispatch(actions.setSortColumnStateAction(column)); },
    fetchLmDataAction : (page, limit, sortField, filter) => { dispatch(actions.fetchLmDataAction(page, limit, sortField, filter)); },
    setNewFilterAction : (filters) => { dispatch(actions.setNewFilterAction(filters)); },
    setTotalNumberOfRecords : (filter) => { dispatch(actions.setTotalNumberOfRecords(filter)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
