import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { PanelGroup, Panel } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

class ReportDatabaseListTable extends Component {
  renderTableRows() {
    const { componentsHistory } = this.props.report;
    return componentsHistory && componentsHistory.map(component => (
      <tr key={component.code}>
        <td className="ReportDatabaseListRow__td">{component.code}</td>
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
    return (
      <div className="ReportDatabaseListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}

          <PanelGroup accordion id="accordion-details" className="ReportDatabaseListTable__panel-accordion-detail">
            <Panel eventKey="1" className="ReportDatabaseListTable__panel-detail">
              <Panel.Heading>
                <Panel.Title toggle className="ReportDatabaseListTable__panel-title"> DataSource Details</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible />
            </Panel>
          </PanelGroup>

        </Spinner>
      </div>
    );
  }
}

ReportDatabaseListTable.propTypes = {
  report: PropTypes.shape({
    componentsHistory:
      PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
  loading: PropTypes.bool,
};

ReportDatabaseListTable.defaultProps = {
  loading: false,
  report: [],
};

export default ReportDatabaseListTable;
