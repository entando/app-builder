import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from '@entando/router';

import { ROUTE_DATABASE_DUMP_TABLE } from 'app-init/router';

const ReportDatabaseDataSource = ({ datasource, tables, onClickDump }) => {
  const renderTableRows = (
    tables.map(table => (
      <tr key={table.tableName}>
        <td className="ReportDatabaseDataSourceRow__td">
          {
          table.rows > 0 ?
            <Link
              route={ROUTE_DATABASE_DUMP_TABLE}
              params={{ dumpCode: table.tableName }}
              onClick={() => onClickDump(datasource, table.tableName)}
            >
              <span className="icon fa fa-arrow-circle-o-down" />&nbsp;{table.tableName}
            </Link>
          : table.tableName
        }
        </td>
        <td className="ReportDatabaseDataSourceRow__td"><code>{table.rows}</code></td>
        <td className="ReportDatabaseDataSourceRow__td">
          {table.requiredTime}&nbsp;<FormattedMessage id="app.milliseconds" />
        </td>
      </tr>
    ))
  );
  return (
    <div className="ReportDatabaseDataSource">

      <table className="ReportDatabaseDataSource__table table table-striped table-bordered">
        <caption>
          <FormattedMessage id="database.datasource" />&nbsp;{datasource}
        </caption>
        <thead>
          <tr>
            <th className="ReportDatabaseDataSource__th-lg">
              <FormattedMessage id="app.tableName" />
            </th>
            <th className="ReportDatabaseDataSource__th-lg">
              <FormattedMessage id="app.rows" />
            </th>
            <th className="ReportDatabaseDataSource__th-lg">
              <FormattedMessage id="app.requiredTime" />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows}
        </tbody>
      </table>
    </div>
  );
};

ReportDatabaseDataSource.propTypes = {
  datasource: PropTypes.string.isRequired,
  tables: PropTypes.arrayOf(PropTypes.shape({})),
  onClickDump: PropTypes.func.isRequired,
};
ReportDatabaseDataSource.defaultProps = {
  tables: [],
};
export default ReportDatabaseDataSource;
