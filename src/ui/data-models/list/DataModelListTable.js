import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const DataModelListTable = ({ children }) => (

  <div className="DataModelListTable">
    <div className="WidgetListTable__tables">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th><FormattedMessage id="app.name" /></th>
            <th className="text-center"><FormattedMessage id="app.type" /></th>
            <th className="text-center" width="10%"><FormattedMessage id="app.id" /></th>
            <th className="text-center" width="10%"><FormattedMessage id="app.actions" /></th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  </div>
);

DataModelListTable.propTypes = {
  children: PropTypes.node,
};

DataModelListTable.defaultProps = {
  children: null,
};

export default DataModelListTable;
