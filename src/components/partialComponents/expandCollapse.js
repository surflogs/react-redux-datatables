import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import { Table, thead } from 'react-bootstrap';

class ExpandCollapse extends Component {

  render() {

    // console.log(JSON.stringify(this.props) + " expandCollapse string");

    const headsToPlot = [];
    const heads = [];
    const rows = [];
    if (this.props.data && this.props.data.length > 0) {
      for (const singleHead in this.props.data[0]) {
        heads.push(singleHead );
        headsToPlot.push(<th>{singleHead}</th>);
      }

      this.props.data.map((singleRow) => {
        const tds = [];
        heads.map((singleTd) => {
          tds.push(<td>{singleRow[singleTd]}</td>);
        })
        rows.push(<tr>{tds}</tr>);
      })
    }
    return (
      <Collapsible trigger={this.props.triggerData}>
        <div>
          <Table striped bordered condensed hover>
            <thead>
              {headsToPlot}
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </div>
      </Collapsible>

    );
  }
}

export default ExpandCollapse;
