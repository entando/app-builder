import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';


class DataModelListActionsMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler, ev) {
    if (handler) {
      ev.preventDefault();
      handler(this.props);
    }
  }

  render() {
    const { onClickDelete } = this.props;

    return (
      <DropdownKebab id="DataModelListActionsMenu" pullRight>
        <MenuItem
          className="DataModelMenuAction__delete"
          onClick={ev => this.handleClick(onClickDelete, ev)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
        <MenuItem
          className="DataModelListActionsMenu__menu-item-edit"
          // onClick={onClickEdit}
        >
          <FormattedMessage id="app.edit" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

DataModelListActionsMenu.propTypes = {
  onClickDelete: PropTypes.func,
};

DataModelListActionsMenu.defaultProps = {
  onClickDelete: () => {},
  // onClickEdit: () => {},
};

export default DataModelListActionsMenu;
