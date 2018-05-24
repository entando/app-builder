import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';

const AttributeListMenuActions = ({
  onClickDelete, onMoveUp, onMoveDown, code, routeToEdit, datatypeCode,
}) => (
  <DropdownKebab pullRight id={`${code}-actions`}>
    <LinkMenuItem
      id={`edit-${code}`}
      route={routeToEdit}
      params={{ entityCode: datatypeCode, attributeCode: code }}
      label={<FormattedMessage id="app.edit" />}
      className="AttributeListMenuAction__menu-item-edit"
    />
    <MenuItem
      className="AttributeListMenuAction__menu-item-move-up"
      onClick={onMoveUp}
    >
      <FormattedMessage id="app.moveUp" />
    </MenuItem>
    <MenuItem
      className="AttributeListMenuAction__menu-item-move-down"
      onClick={onMoveDown}
    >
      <FormattedMessage id="app.moveDown" />
    </MenuItem>
    <MenuItem
      className="AttributeListMenuAction__menu-item-delete"
      onClick={onClickDelete}
    >
      <FormattedMessage id="app.delete" />
    </MenuItem>
  </DropdownKebab>
);

AttributeListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  code: PropTypes.string.isRequired,
  routeToEdit: PropTypes.string.isRequired,
  datatypeCode: PropTypes.string,
};

AttributeListMenuActions.defaultProps = {
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
  datatypeCode: '',
};

export default AttributeListMenuActions;
