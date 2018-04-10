import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import { formattedText } from 'frontend-common-components';
import AttributeListMenuActions from 'ui/common/attributes/AttributeListMenuActions';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';

const AttributeListTable = ({ attributes }) => {
  const renderRoles = (roles) => {
    if (roles.length > 0) {
      return (
        <ul className="AttributeListTable__role-list">
          {roles.map(role => (
            <li key={role.code}>{role.descr}</li>
          ))}
        </ul>
      );
    }

    return (<span>&ndash;</span>);
  };

  const renderTableRows = () => attributes.map(attribute => (
    <tr key={attribute.code}>
      <td className="AttributeListRow__td">{attribute.code}</td>
      <td className="AttributeListRow__td">{attribute.type}</td>
      <td className="AttributeListRow__td">
        {renderRoles(attribute.roles)}
      </td>
      <td className="AttributeListRow__td text-center">
        <AttributeCheckIcon isChecked={attribute.mandatory} />
      </td>
      <td className="AttributeListRow__td text-center">
        <AttributeCheckIcon isChecked={attribute.listFilter} />
      </td>
      <td className="AttributeListRow__td text-center">
        <AttributeListMenuActions code={attribute.code} />
      </td>
    </tr>
  ));

  const renderTable = () => (
    <table className="AttributeListTable__table table table-striped table-bordered">
      <thead>
        <tr>
          <th className="AttributeListTable__th-md">
            <FormattedMessage id="app.code" />
          </th>
          <th className="AttributeListTable__th-sm">
            <FormattedMessage id="app.type" />
          </th>
          <th className="AttributeListTable__th-md">
            <FormattedMessage id="app.roles" />
          </th>
          <th className="AttributeListTable__th-xs text-center">
            <FormattedMessage id="app.mandatory" />
          </th>
          <th className="AttributeListTable__th-xs text-center">
            <FormattedMessage id="app.filter" />
          </th>
          <th className="AttributeListTable__th-xs text-center">
            <FormattedMessage id="app.actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </table>
  );

  return (
    <div className="AttributeListTable">
      {renderTable()}
    </div>
  );
};

AttributeListTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
};

AttributeListTable.defaultProps = {
  attributes: [],
};

export default AttributeListTable;
