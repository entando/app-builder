import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem, gotoRoute } from 'frontend-common-components';
import { ROUTE_USER_AUTHORITY, ROUTE_USER_DETAIL } from 'app-init/router';

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
    const manageAuthLabel = (
      <FormattedMessage id="user.action.manageAuth" values={{ username: this.props.username }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.username}-actions`}>

        <MenuItem
          className="UserListMenuAction__menu-item-edit"
        >
          <FormattedMessage id="app.edit" />
        </MenuItem>
        <LinkMenuItem
          id={`manageAuth-${this.props.username}`}
          route={ROUTE_USER_AUTHORITY}
          params={{ username: this.props.username }}
          label={manageAuthLabel}
          className="UserListMenuAction__menu-item-auth"
        />
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
