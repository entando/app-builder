import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const CategoryListMenuActions = ({ onClickDelete, code }) => (
  <DropdownKebab pullRight id={`${code}-actions`}>

    <MenuItem
      className="CategoryListMenuAction__menu-item-detail"
    >
      <FormattedMessage id="app.details" values={{ code }} />
    </MenuItem>
    <MenuItem
      className="CategoryListMenuAction__menu-item-add"
    >
      <FormattedMessage id="app.add" />
    </MenuItem>
    <MenuItem
      className="CategoryListMenuAction__menu-item-edit"
    >
      <FormattedMessage id="app.edit" />
    </MenuItem>
    <MenuItem
      className="CategoryListMenuAction__menu-item-delete"
      onClick={onClickDelete}
    >
      <FormattedMessage id="app.delete" />
    </MenuItem>
  </DropdownKebab>
);

CategoryListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

CategoryListMenuActions.defaultProps = {
  onClickDelete: null,
};

export default CategoryListMenuActions;
