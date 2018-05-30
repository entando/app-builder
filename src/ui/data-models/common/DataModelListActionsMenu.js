import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const DataModelListActionsMenu = ({ onClickEdit, onClickDelete }) => (
  <DropdownKebab id="DataModelListActionsMenu" pullRight>
    <MenuItem
      className="DataModelMenuAction__delete"
      onClick={onClickDelete}
    >
      <FormattedMessage id="app.delete" />
    </MenuItem>
    <MenuItem
      className="DataModelListActionsMenu__menu-item-edit"
      onClick={onClickEdit}
    >
      <FormattedMessage id="app.edit" />
    </MenuItem>
  </DropdownKebab>
);

DataModelListActionsMenu.propTypes = {
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
};

DataModelListActionsMenu.defaultProps = {
  onClickDelete: () => {},
  onClickEdit: () => {},
};

export default DataModelListActionsMenu;
