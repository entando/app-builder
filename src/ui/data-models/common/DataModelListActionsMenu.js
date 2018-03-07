import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';


class DataModelListActionsMenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }
  render() {
    const { onClickDelete, onClickEdit } = this.props;

    return (

      <DropdownKebab id="DataModelListActionsMenu" pullRight>
        <MenuItem
          className="DataModelListActionsMenu__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
        <MenuItem
          className="DataModelListActionsMenu__menu-item-edit"
          onClick={this.handleClick(onClickEdit)}
        >
          <FormattedMessage id="app.edit" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

DataModelListActionsMenu.propTypes = {
  onClickDelete: PropTypes.func,
  onClickEdit: PropTypes.func,
};

DataModelListActionsMenu.defaultProps = {
  onClickDelete: null,
  onClickEdit: null,
};

export default DataModelListActionsMenu;
