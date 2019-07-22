import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import LinkMenuItem from 'ui/common/LinkMenuItem';
import { routeConverter } from 'helpers/routeConverter';

const AttributeListMenuActionsProfile = ({
  onClickDelete, onMoveUp, onMoveDown, code, routeToEdit, profiletypeCode,
}) => (
  <DropdownKebab pullRight id={`${code}-actions`}>
    <LinkMenuItem
      id={`edit-${code}`}
      to={routeConverter(routeToEdit, { entityCode: profiletypeCode, attributeCode: code })}
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

AttributeListMenuActionsProfile.propTypes = {
  onClickDelete: PropTypes.func,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  code: PropTypes.string.isRequired,
  routeToEdit: PropTypes.string.isRequired,
  profiletypeCode: PropTypes.string.isRequired,
};

AttributeListMenuActionsProfile.defaultProps = {
  onClickDelete: null,
  onMoveUp: null,
  onMoveDown: null,
};

export default AttributeListMenuActionsProfile;
