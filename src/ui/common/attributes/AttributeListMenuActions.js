import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';

const AttributeListMenuActions = ({
  onClickDelete, onMoveUp, onMoveDown, code, routeToEdit, entityCode,
  isMovableUp, isMovableDown, attributeIndex,
}) => {
  const renderEdit = () => {
    if (routeToEdit) {
      return (
        <LinkMenuItem
          id={`edit-${code}`}
          route={routeToEdit}
          params={{ entityCode, attributeCode: code }}
          label={<FormattedMessage id="app.edit" />}
          className="AttributeListMenuAction__menu-item-edit"
        />
      );
    }
    return null;
  };

  const renderMoveUp = () => {
    if (isMovableUp) {
      return (
        <MenuItem
          className="AttributeListMenuAction__menu-item-move-up"
          onClick={() => onMoveUp(entityCode, code, attributeIndex)}
        >
          <FormattedMessage id="app.moveUp" />
        </MenuItem>
      );
    }
    return null;
  };

  const renderMoveDown = () => {
    if (isMovableDown) {
      return (
        <MenuItem
          className="AttributeListMenuAction__menu-item-move-down"
          onClick={() => onMoveDown(entityCode, code, attributeIndex)}
        >
          <FormattedMessage id="app.moveDown" />
        </MenuItem>
      );
    }
    return null;
  };

  return (
    <DropdownKebab pullRight id={`${code}-actions`}>
      {renderEdit()}
      {renderMoveUp()}
      {renderMoveDown()}
      <MenuItem
        className="AttributeListMenuAction__menu-item-delete"
        onClick={() => onClickDelete(code)}
      >
        <FormattedMessage id="app.delete" />
      </MenuItem>
    </DropdownKebab>
  );
};

AttributeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  code: PropTypes.string.isRequired,
  routeToEdit: PropTypes.string,
  entityCode: PropTypes.string,
  isMovableUp: PropTypes.bool,
  isMovableDown: PropTypes.bool,
  attributeIndex: PropTypes.number,
};

AttributeListMenuActions.defaultProps = {
  routeToEdit: '',
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  entityCode: '',
  isMovableUp: false,
  isMovableDown: false,
  attributeIndex: 0,
};

export default AttributeListMenuActions;
