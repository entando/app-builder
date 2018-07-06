import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { Col } from 'patternfly-react';
import AttributeListMenuActions from 'ui/common/attributes/AttributeListMenuActions';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';
import { TYPE_LIST, TYPE_MONOLIST } from 'state/data-types/const';

const AttributeListTable = (props) => {
  const { attributes } = props;
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

  const renderTableRows = () => attributes.map((attribute, index) => {
    const isMovableUp = index > 0;
    const isMovableDown = index < attributes.length - 1;
    const { type, nestedAttribute } = attribute;
    return (
      <tr key={attribute.code}>
        <td className="AttributeListRow__td">{attribute.code}</td>
        <td className="AttributeListRow__td">
          {
            type === TYPE_LIST || type === TYPE_MONOLIST ? `${type}: ${nestedAttribute.type}` : type
          }
        </td>
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
          <AttributeListMenuActions
            {...props}
            attributeIndex={index}
            isMovableUp={isMovableUp}
            isMovableDown={isMovableDown}
            code={attribute.code}
          />
        </td>
      </tr>
    );
  });

const AttributeListTable = ({
  attributes, onClickDelete, onMoveUp, onMoveDown, entityCode, routeToEdit,
}) => {
  const renderTable = () => (
    <Col xs={10} xsOffset={2}>
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
          <FieldArray
            attributes={attributes}
            onClickDelete={onClickDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            entityCode={entityCode}
            routeToEdit={routeToEdit}
            name="attributes"
            component={AttributeListTableActions}
            rerenderOnEveryChange
          />
        </tbody>
      </table>
    </Col>
  );

  return (
    <div className="AttributeListTable">
      {attributes.length > 0 ? renderTable() : null}
    </div>
  );
};

AttributeListTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  entityCode: PropTypes.string,
  routeToEdit: PropTypes.string,
};

AttributeListTable.defaultProps = {
  attributes: [],
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  entityCode: '',
  routeToEdit: '',
};

export default AttributeListTable;
