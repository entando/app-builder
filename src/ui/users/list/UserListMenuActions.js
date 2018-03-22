import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_USER_DETAIL } from 'app-init/router';

import { gotoRoute } from 'frontend-common-components';

class UserListMenuActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickView = this.handleClickView.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }

  handleClickView = (ev) => {
    ev.preventDefault();
    this.props.onClickView(this.props.username);
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
          onClick={() => gotoRoute(ROUTE_USER_DETAIL, { username: this.props.username })}
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
  onClickView: PropTypes.func,
  username: PropTypes.string.isRequired,
};

UserListMenuActions.defaultProps = {
  onClickDelete: () => {},
  onClickView: () => {},
};

export default UserListMenuActions;
