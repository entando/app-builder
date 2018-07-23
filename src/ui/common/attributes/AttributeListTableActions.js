import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import AttributeCheckIcon from 'ui/common/attributes/AttributeCheckIcon';
import { LinkMenuItem } from 'frontend-common-components';
import { TYPE_LIST, TYPE_MONOLIST } from 'state/data-types/const';

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

const AttributeListTableActions = ({
  fields,
  attributes,
  onClickDelete,
  onMoveUp,
  onMoveDown,
  routeToEdit,
  entityCode,
}) =>
  attributes.map((attribute, index) => {
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
          <AttributeCheckIcon isChecked={attribute.mandatory || false} />
        </td>
        <td className="AttributeListRow__td text-center">
          <AttributeCheckIcon isChecked={attribute.listFilter || false} />
        </td>

        <td className="AttributeListRow__td text-center">
          <DropdownKebab pullRight id={`${attribute.code}-actions`}>
            <LinkMenuItem
              id={`edit-${attribute.code}`}
              route={routeToEdit}
              params={{ entityCode, attributeCode: attribute.code }}
              label={<FormattedMessage id="app.edit" />}
              className="AttributeListMenuAction__menu-item-edit"
            />
            {
              isMovableUp ?
                <MenuItem
                  className="AttributeListMenuAction__menu-item-move-up"
                  onClick={() => {
                    onMoveUp(entityCode, attribute.code, index);
                    fields.move(index, index - 1);
                  }
                }
                >
                  <FormattedMessage id="app.moveUp" />
                </MenuItem>
              : null
            }
            {
            isMovableDown ?
              <MenuItem
                className="AttributeListMenuAction__menu-item-move-down"
                onClick={() => {
                   onMoveDown(entityCode, attribute.code, index);
                   fields.move(index, index + 1);
                }
              }
              >
                <FormattedMessage id="app.moveDown" />
              </MenuItem>
            : null
          }
            <MenuItem
              className="AttributeListMenuAction__menu-item-delete"
              onClick={() => { fields.remove(index); onClickDelete(attribute.code); }
               }
            >
              <FormattedMessage id="app.delete" />
            </MenuItem>
          </DropdownKebab>
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
};

AttributeListTableActions.defaultProps = {
  attributes: [],
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  entityCode: '',
  routeToEdit: '',
};

export default AttributeListTableActions;
