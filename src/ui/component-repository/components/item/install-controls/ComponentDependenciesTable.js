import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Table } from 'react-bootstrap';

const ComponentDependenciesTable = ({
  dependencies = [],
}) => (
  <div className="InstallationPlanTable InstallationPlanTable--error">
    <Table className="InstallationPlanTable__table" striped bordered condensed hover >
      <thead>
        <tr>
          <th><FormattedMessage id="menu.components" /></th>
          <th><FormattedMessage id="category.reference.table.typeCode" /></th>
        </tr>
      </thead>
      <tbody>
        {
            dependencies.map(({
              code,
            type,
            }) => (
              <tr key={`${type}-${code}`}>
                <td>{code}</td>
                <td>{type}</td>
              </tr>))
        }
      </tbody>
    </Table>
  </div>
);

ComponentDependenciesTable.propTypes = {
  dependencies: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
};

ComponentDependenciesTable.defaultProps = {
  dependencies: [],
};

export default injectIntl(ComponentDependenciesTable);
