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
    const editLabel = (
      <FormattedMessage id="app.edit" values={{ username: this.props.username }} />
    );
    const manageAuthLabel = (
      <FormattedMessage id="user.action.manageAuth" values={{ username: this.props.username }} />
    );
    const editProfileLabel = (
      <FormattedMessage id="user.action.editProfile" values={{ username: this.props.username }} />
    );
    const viewProfileLabel = (
      <FormattedMessage id="user.action.viewProfile" values={{ username: this.props.username }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.username}-actions`}>

        <MenuItem
          className="UserListMenuAction__menu-item-edit"
          onClick={this.handleClick()}
        >
          {editLabel}
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-auth"
          onClick={this.handleClick()}
        >
          {manageAuthLabel}
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-edit-profile"
          onClick={this.handleClick()}
        >
          {editProfileLabel}
        </MenuItem>
        <MenuItem
          className="UserListMenuAction__menu-item-view-profile"
          onClick={this.handleClick()}
        >
          {viewProfileLabel}
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
