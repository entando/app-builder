import React, { Component } from 'react';
import Proptypes from 'prop-types';

class DatabaseDumpTablePage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    return (
      <div className="DatabaseDumpTablePage" >
        {this.props.table}
      </div>
    );
  }
}
DatabaseDumpTablePage.propTypes = {
  onWillMount: Proptypes.func.isRequired,
  // dumpCode: Proptypes.string,
  // datasource: Proptypes.string,
  table: Proptypes.string,
};

DatabaseDumpTablePage.defaultProps = {
  // dumpCode: '',
  // datasource: '',
  table: '',
};
export default DatabaseDumpTablePage;
