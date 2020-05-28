import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';

import { CRUD_USERS_PERMISSION, EDIT_USER_PROFILES_PERMISSION } from 'state/permissions/const';
import {
  history,
  ROUTE_USER_AUTHORITY, ROUTE_USER_DETAIL,
  ROUTE_USER_EDIT, ROUTE_USER_PROFILE,
} from 'app-init/router';

class UserListMenuActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickView = this.handleClickView.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit() {
    history.push(routeConverter(ROUTE_USER_EDIT, { username: this.props.username }));
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
    const { canUser, onClickDelete, hasProfile } = this.props;

    const canEdit = canUser(CRUD_USERS_PERMISSION);
    const canEditProfile = canUser(EDIT_USER_PROFILES_PERMISSION);

    if (!hasProfile && !canEdit && !canEditProfile) {
      return null;
    }

    const manageAuthLabel = canEdit && (
      <FormattedMessage id="user.action.manageAuth" values={{ username: this.props.username }} />
    );
    const editUserProfileLabel = canEditProfile && (
      <FormattedMessage id="user.action.editProfile" values={{ username: this.props.username }} />
    );

    const renderViewProfile = () => {
      if (hasProfile) {
        return (
          <MenuItem
            className="UserListMenuAction__menu-item-view-profile"
            onClick={() => history.push(routeConverter(
              ROUTE_USER_DETAIL,
              { username: this.props.username },
            ))}
          >
            <FormattedMessage id="user.action.viewProfile" values={{ username: this.props.username }} />
          </MenuItem>
        );
      }
      return null;
    };

    return (
      <DropdownKebab pullRight id={`${this.props.username}-actions`}>
        {canEdit && (
          <React.Fragment>
            <MenuItem
              className="UserListMenuAction__menu-item-edit"
              onClick={this.onClickEdit}
            >
              <FormattedMessage id="app.edit" />
            </MenuItem>
            <LinkMenuItem
              id={`manageAuth-${this.props.username}`}
              to={routeConverter(ROUTE_USER_AUTHORITY, { username: this.props.username })}
              label={manageAuthLabel}
              className="UserListMenuAction__menu-item-auth"
            />
          </React.Fragment>
        )}
        {canEditProfile && (
          <LinkMenuItem
            id={`editProfile-${this.props.username}`}
            to={routeConverter(ROUTE_USER_PROFILE, { username: this.props.username })}
            label={editUserProfileLabel}
            className="UserListMenuAction__menu-item-edit-profile"
          />
        )}
        {renderViewProfile()}
        {canEdit && (
          <MenuItem
            className="UserListMenuAction__menu-item-delete"
            onClick={this.handleClick(onClickDelete)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        )}
      </DropdownKebab>
    );
  }
}

UserListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  onClickView: PropTypes.func,
  username: PropTypes.string.isRequired,
  hasProfile: PropTypes.bool,
  canUser: PropTypes.func,
};

UserListMenuActions.defaultProps = {
  onClickDelete: () => {},
  onClickView: () => {},
  hasProfile: false,
  canUser: () => true,
};

export default UserListMenuActions;
