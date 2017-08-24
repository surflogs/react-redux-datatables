import React, { Component } from 'react';
import { thead } from 'react-bootstrap';
class Headers extends Component {
  render(){
    const headers = [];
    if (this.props.headerConfig) {
      this.props.headerConfig.map((header) => {
        headers.push(<th>{header.headername}</th>);
      });
    }

    return (
      <thead>
        {headers}
      </thead>
    );
  }
}

export default Headers;
