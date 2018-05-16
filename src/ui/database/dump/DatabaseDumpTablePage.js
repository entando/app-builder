import React, { Component } from 'react';
import Proptypes from 'prop-types';

class DatabaseDumpTablePage extends Component {
  componentWillMount() {
    this.props.onWillMount();
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
  onWillMount: Proptypes.func.isRequired,
  dumpData: Proptypes.string,
};

DatabaseDumpTablePage.defaultProps = {
  dumpData: '',
};
export default DatabaseDumpTablePage;
