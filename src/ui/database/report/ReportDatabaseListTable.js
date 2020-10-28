import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ReportDatabaseListDataSource from 'ui/database/report/ReportDatabaseListDataSource';

class ReportDatabaseListTable extends Component {
  renderTableRows() {
    const { componentsHistory } = this.props.report;
    return componentsHistory && componentsHistory.map(component => (
      <tr key={component.code}>
        <td className="ReportDatabaseListRow__td">{component.description || component.code}</td>
        <td className="ReportDatabaseListRow__td"><code>{component.date}</code></td>
      </tr>
    ));
  }

  renderTable() {
    return (
      <table className="ReportDatabaseListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="databasesListTable__th-lg"><FormattedMessage id="database.componentName" /></th>
            <th className="databasesListTable__th-lg"><FormattedMessage id="database.dumpDate" /></th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
  render() {
    const { dataSourcesReports, code: databaseReportCode } = this.props.report;
    return (
      <div className="ReportDatabaseListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <ReportDatabaseListDataSource
            dataSourcesReports={dataSourcesReports}
            databaseReportCode={databaseReportCode}
          />
        </Spinner>
      </div>
    );
  }
}

ReportDatabaseListTable.propTypes = {
  report: PropTypes.shape({
    code: PropTypes.string,
    dataSourcesReports: PropTypes.shape({}),
    componentsHistory:
      PropTypes.arrayOf(PropTypes.shape({})),
  }),
  loading: PropTypes.bool,
};

ReportDatabaseListTable.defaultProps = {
  loading: false,
  report: {
    code: '',
    dataSourcesReports: {},
    componentsHistory: [],
  },
};

export default ReportDatabaseListTable;
