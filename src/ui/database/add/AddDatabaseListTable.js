import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';
import { isEmpty } from 'lodash';
import { Link } from '@entando/router';

import { ROUTE_DATABASE_LIST } from 'app-init/router';


const AddDatabaseListTable = ({ tables, onClickStartBackup }) => {
  const renderItem = tableMapping => (
    !isEmpty(tableMapping) ? Object.keys(tableMapping).map(key => (
      <li key={key}>
        <code>{key}</code>: &nbsp; {tableMapping[key].join(', ')}
      </li>
    )) : <FormattedMessage id="database.noTable" />
  );
  const renderTable = () => (
    tables.map(table => (

      <li key={table.code} className="AddDatabaseListTable__list">
        <div className="AddDatabaseListTable__text">{table.code}</div>
        <ul className="AddDatabaseListTable__list-item">
          {renderItem(table.tableMapping)}
        </ul>
      </li>

    ))
  );

  return (
    <div className="AddDatabaseListTable dl-horizontal" >
      <ul className="list-unstyled">
        {renderTable()}
      </ul>
      <div className="AddDatabaseListTable__btn-add">
        <Button
          className="AddDatabaseListTable__backup pull-right"
          bsStyle="primary"
          onClick={onClickStartBackup}
        >
          <FormattedMessage id="database.backup" />
        </Button>
        <Link route={ROUTE_DATABASE_LIST}>
          <Button className="AddDatabaseListTable__goto-list pull-right" bsStyle="default">
            <FormattedMessage id="database.gotoList" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

AddDatabaseListTable.propTypes = {
  onClickStartBackup: PropTypes.func.isRequired,
  tables: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.String,
    tableMapping: PropTypes.shape({ }),
  })).isRequired,
};

export default AddDatabaseListTable;
