import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PanelGroup, Panel } from 'react-bootstrap';

const ReportDatabaseListDataSource = () => (
  <div className="ReportDatabaseListDataSource">
    <PanelGroup accordion id="accordion-details" className="ReportDatabaseListDataSource__panel-accordion-detail">
      <Panel eventKey="1" className="ReportDatabaseListDataSource__panel-detail">
        <Panel.Heading>
          <Panel.Title toggle className="ReportDatabaseListDataSource__panel-title"> DataSource Details</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible >
          <table className="ReportDatabaseListDataSource__table table table-striped table-bordered">
            <thead>
              <tr>
                <th className="ReportDatabaseListDataSource__th-lg">
                  <FormattedMessage id="app.tableName" />
                </th>
                <th className="ReportDatabaseListDataSource__th-lg">
                  <FormattedMessage id="app.rows" />
                </th>
                <th className="ReportDatabaseListDataSource__th-lg">
                  <FormattedMessage id="app.requiredTime" />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                // this.renderTableRows()
             }
            </tbody>
          </table>
        </Panel.Body>
      </Panel>
    </PanelGroup>
  </div>
);
export default ReportDatabaseListDataSource;
