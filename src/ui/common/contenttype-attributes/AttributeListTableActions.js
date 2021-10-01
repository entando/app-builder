import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { routeConverter } from '@entando/utils';
import { LinkMenuItem } from '@entando/menu';
import AttributeCheckIcon from 'ui/common/contenttype-attributes/AttributeCheckIcon';
import { TYPE_LIST, TYPE_MONOLIST } from 'state/content-type/const';

const renderRoles = (roles) => {
  if (roles.length > 0) {
    return (
      <ul className="ContTypeAttributeListTable__role-list">
        {roles.map(role => (
          <li key={role.code}>{role.code} - {role.descr}</li>
        ))}
      </ul>
    );
  }
  return <span>&ndash;</span>;
};

const AttributeListTableActions = ({
  fields,
  attributes,
  onClickDelete,
  onMoveUp,
  onMoveDown,
  routeToEdit,
  entityCode,
  locale,
}) => attributes.map((attribute, index) => {
  const isMovableUp = index > 0;
  const isMovableDown = index < attributes.length - 1;
  const { type, nestedAttribute } = attribute;
  const { names = {} } = attribute;
  const localizedName = _.isObject(names) ? (names[locale] || '') : names;
  return (
    <tr key={attribute.code}>
      <td className="ContTypeAttributeListRow__td">{attribute.code}</td>
      <td className="ContTypeAttributeListRow__td">{localizedName}</td>
      <td className="ContTypeAttributeListRow__td">
        {type === TYPE_LIST || type === TYPE_MONOLIST ? `${type}: ${nestedAttribute.type}` : type}
      </td>
      <td className="ContTypeAttributeListRow__td">{renderRoles(attribute.roles)}</td>
      <td className="ContTypeAttributeListRow__td text-center">
        <AttributeCheckIcon isChecked={attribute.mandatory || false} />
      </td>
      <td className="ContTypeAttributeListRow__td text-center">
        <AttributeCheckIcon isChecked={attribute.listFilter || false} />
      </td>

      <td className="ContTypeAttributeListRow__td text-center">
        <div data-testid={`${attribute.code}-actions`}>
          <DropdownKebab pullRight id={`${attribute.code}-actions`}>
            <LinkMenuItem
              id={`edit-${attribute.code}`}
              to={routeConverter(routeToEdit, { entityCode, attributeCode: attribute.code })}
              label={<FormattedMessage id="cms.label.edit" />}
              className="ContTypeAttributeListMenuAction__menu-item-edit"
            />
            {isMovableUp ? (
              <MenuItem
                className="ContTypeAttributeListMenuAction__menu-item-move-up"
                onClick={() => {
                  onMoveUp(entityCode, attribute.code, index);
                  fields.move(index, index - 1);
                }}
              >
                <FormattedMessage id="cms.label.moveUp" />
              </MenuItem>
            ) : null}
            {isMovableDown ? (
              <MenuItem
                className="ContTypeAttributeListMenuAction__menu-item-move-down"
                onClick={() => {
                  onMoveDown(entityCode, attribute.code, index);
                  fields.move(index, index + 1);
                }}
              >
                <FormattedMessage id="cms.label.moveDown" />
              </MenuItem>
            ) : null}
            <MenuItem
              className="ContTypeAttributeListMenuAction__menu-item-delete"
              onClick={() => {
                fields.remove(index);
                onClickDelete(attribute.code);
              }}
            >
              <FormattedMessage id="cms.label.delete" />
            </MenuItem>
          </DropdownKebab>
        </div>
      </td>
    </tr>
  );
});

AttributeListTableActions.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})),
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  entityCode: PropTypes.string,
  routeToEdit: PropTypes.string,
  locale: PropTypes.string,
};

AttributeListTableActions.defaultProps = {
  attributes: [],
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  entityCode: '',
  routeToEdit: '',
  locale: '',
};

export default AttributeListTableActions;
