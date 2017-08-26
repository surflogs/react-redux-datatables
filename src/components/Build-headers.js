import React, { Component } from 'react';
import { thead } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import * as actions from '../actions/react-datatable-action';
import DropDownFilterDatatable from './partialComponents/dropdownFilter';
import NumberFilterDatatable from '../components/partialComponents/numberFilter';

function mapCellTypeToComponent(Component, val, id, handler) {
  let c;
  switch (Component) {
    case 'dropdown':
      c = <DropDownFilterDatatable keyData={id} onClick={ handler }/>;
      break;
    case 'textbox':
      c = <FormControl className="form-control" type="text" keyData={id} onBlur={ handler } />;
      break;
    case 'number':
      c = <NumberFilterDatatable keyData={id} onBlur={ handler } />;
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
    console.log(JSON.stringify(sortData));
    this.props.fetchLmDataAction(this.props.activePage, this.props.pageSize, JSON.stringify(sortData));
  }

  onSelect(eventKey, event) {
    const filter = {};
    filter[event.target.id] = eventKey;
    console.log(eventKey);
    console.log(JSON.stringify(filter));
    // this.props.fetchLmDataAction(1, this.props.pageSize, JSON.stringify(filter));
    // this.props.setNewFilter(filter);
  }

  onBlurOfTextBox(event) {
    console.log(event);
    console.log(event.target.id);
    console.log(event.target.value);

  }

  bindDbHandlerToHandler(handlerName) {
    let c;
    switch (handlerName) {
      case 'onSelect':
        console.log(' in proper case');
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
    console.log(name.target.id);
    if (this.props.sortColumn) {
      if (this.props.sortColumn === name.target.id) {
        console.log(" decending... ");
        this.props.setSortColumnStateAction(name.target.id);
        this.props.setSortOrderStateAction(-1);

        this.fillData(name.target.id, -1);
      } else {
        console.log(" alag column ascending... ");
        this.props.setSortColumnStateAction(name.target.id);
        this.props.setSortOrderStateAction(1);
        this.fillData(name.target.id, 1);
      }
    } else {
      console.log(" first time ");
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
        console.log(header.handler);
        const handler = this.bindDbHandlerToHandler(header.handler);
        console.log(handler + " this is handler");
        headers.push(<th key = {header.dbfeild} id={header.dbfeild}>{header.headername}</th>);
        filters.push(<th key = {header.dbfeild} id={header.dbfeild}> {mapCellTypeToComponent(header.filtertype, header.filtervalue, header.dbfeild, handler)} </th>);
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
    pageSize : state.datatable.pageSize
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSortOrderStateAction :(order) => { dispatch(actions.setSortOrderStateAction(order)); },
    setSortColumnStateAction :(column) => { dispatch(actions.setSortColumnStateAction(column)); },
    fetchLmDataAction : (page, limit, sortField) => { dispatch(actions.fetchLmDataAction(page, limit, sortField)); }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Headers);
