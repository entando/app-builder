import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

class UserListMenuActions extends Component {
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
    const { onClickDelete } = this.props;

    return (
      <DropdownKebab pullRight id={`${this.props.username}-actions`}>

        <MenuItem
          className="UserListMenuAction__menu-item-edit"
        >
          <FormattedMessage id="app.edit" />
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-auth"
        >
          <FormattedMessage id="user.action.manageAuth" values={{ username: this.props.username }} />
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-edit-profile"
        >
          <FormattedMessage id="user.action.editProfile" values={{ username: this.props.username }} />
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-view-profile"
        >
          <FormattedMessage id="user.action.viewProfile" values={{ username: this.props.username }} />
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-delete"
          onClick={this.handleClick(onClickDelete)}
        >
          <FormattedMessage id="app.delete" />
        </MenuItem>
      </DropdownKebab>
    );
  }
}

UserListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  username: PropTypes.string.isRequired,
};

UserListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default UserListMenuActions;
