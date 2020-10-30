import React, { Component } from 'react';
import Proptypes from 'prop-types';

class DatabaseDumpTablePage extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }
  render() {
    return (
      <div className="DatabaseDumpTablePage" >
        {JSON.stringify(atob(this.props.dumpData))}
      </div>
    );
  }
}
DatabaseDumpTablePage.propTypes = {
  onDidMount: Proptypes.func.isRequired,
  dumpData: Proptypes.string,
};

DatabaseDumpTablePage.defaultProps = {
  dumpData: '',
};
export default DatabaseDumpTablePage;
