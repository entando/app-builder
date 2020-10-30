import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PanelGroup, Panel } from 'react-bootstrap';
import ReportDatabaseDataSourceContainer from 'ui/database/report/ReportDatabaseDataSourceContainer';

const ReportDatabaseListDataSource = ({ dataSourcesReports, databaseReportCode }) => (
  <div className="ReportDatabaseListDataSource">
    <PanelGroup accordion id="accordion-details" className="ReportDatabaseListDataSource__panel-accordion-detail">
      <Panel eventKey="1" className="ReportDatabaseListDataSource__panel-detail">
        <Panel.Heading>
          <Panel.Title toggle className="ReportDatabaseListDataSource__panel-title">
            <FormattedMessage id="database.datasourceDetails" />
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible >
          {
          Object.keys(dataSourcesReports).map(datasource => (
            <ReportDatabaseDataSourceContainer
              key={datasource}
              datasource={datasource}
              tables={dataSourcesReports[datasource]}
              databaseReportCode={databaseReportCode}
            />
          ))
        }
        </Panel.Body>
      </Panel>
    </PanelGroup>
  </div>
);

ReportDatabaseListDataSource.propTypes = {
  dataSourcesReports: PropTypes.shape({
  }),
  databaseReportCode: PropTypes.string.isRequired,
};

ReportDatabaseListDataSource.defaultProps = {
  dataSourcesReports: {},
};
export default ReportDatabaseListDataSource;
