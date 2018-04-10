import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const AttributeListMenuActions = ({
  onClickDelete, onMoveUp, onMoveDown, code,
}) => (
  <DropdownKebab pullRight id={`${code}-actions`}>
    <MenuItem
      className="AttributeListMenuAction__menu-item-edit"
    >
      <FormattedMessage id="app.edit" />
    </MenuItem>
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
};

AttributeListMenuActions.defaultProps = {
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
};

export default AttributeListMenuActions;
