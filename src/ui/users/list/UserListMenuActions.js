import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter, hasAccess } from '@entando/utils';

import { CRUD_USERS_PERMISSION, EDIT_USER_PROFILES_PERMISSION } from 'state/permissions/const';
import {
  history,
  ROUTE_USER_AUTHORITY, ROUTE_USER_DETAIL,
  ROUTE_USER_EDIT, ROUTE_USER_PROFILE,
} from 'app-init/router';
import { TEST_ID_USER_LIST_TABLE } from 'ui/test-const/user-test-const';

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
    const {
      userPermissions,
      onClickDelete,
      hasProfile,
    } = this.props;
    const canEdit = hasAccess(CRUD_USERS_PERMISSION, userPermissions);
    const canEditProfile =
    hasAccess([EDIT_USER_PROFILES_PERMISSION], userPermissions);

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
            data-testid={TEST_ID_USER_LIST_TABLE.ACTION_VIEW_PROFILE}
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
              data-testid={TEST_ID_USER_LIST_TABLE.ACTION_EDIT_USER}
            >
              <FormattedMessage id="app.edit" />
            </MenuItem>
            {canEdit && (
              <LinkMenuItem
                id={`manageAuth-${this.props.username}`}
                to={routeConverter(ROUTE_USER_AUTHORITY, { username: this.props.username })}
                label={manageAuthLabel}
                className="UserListMenuAction__menu-item-auth"
              />
            )}
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
            data-testid={TEST_ID_USER_LIST_TABLE.ACTION_DELETE_USER}
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
  userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

UserListMenuActions.defaultProps = {
  onClickDelete: () => {},
  onClickView: () => {},
  hasProfile: false,
};

export default UserListMenuActions;
