import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col } from 'patternfly-react';
import AttributeListMenuActionsProfile from 'ui/common/attributes/AttributeListMenuActionsProfile';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';

const AttributeListTableProfile = (props) => {
  const { attributes } = props;

  const renderRoles = (roles) => {
    if (roles.length > 0) {
      return (
        <ul className="AttributeListTableProfile__role-list">
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
        <AttributeListMenuActionsProfile {...props} code={attribute.code} />
      </td>
    </tr>
  ));

  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
      <table className="AttributeListTableProfile__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="AttributeListTableProfile__th-md">
              <FormattedMessage id="app.code" />
            </th>
            <th className="AttributeListTableProfile__th-sm">
              <FormattedMessage id="app.type" />
            </th>
            <th className="AttributeListTableProfile__th-md">
              <FormattedMessage id="app.roles" />
            </th>
            <th className="AttributeListTableProfile__th-xs text-center">
              <FormattedMessage id="app.mandatory" />
            </th>
            <th className="AttributeListTableProfile__th-xs text-center">
              <FormattedMessage id="app.filter" />
            </th>
            <th className="AttributeListTableProfile__th-xs text-center">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTableProfile">
      {renderTable()}
    </div>
  );
};

AttributeListTableProfile.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
};

AttributeListTableProfile.defaultProps = {
  attributes: [],
};

export default AttributeListTableProfile;
