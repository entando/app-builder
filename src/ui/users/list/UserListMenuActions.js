import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import LinkMenuItem from 'ui/common/LinkMenuItem';
import {
  history,
  ROUTE_USER_AUTHORITY, ROUTE_USER_DETAIL,
  ROUTE_USER_EDIT, ROUTE_USER_PROFILE,
} from 'app-init/router';
import { routeConverter } from 'helpers/routeConverter';

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
    const { onClickDelete } = this.props;
    const manageAuthLabel = (
      <FormattedMessage id="user.action.manageAuth" values={{ username: this.props.username }} />
    );
    const editUserProfileLabel = (
      <FormattedMessage id="user.action.editProfile" values={{ username: this.props.username }} />
    );

    const renderViewProfile = () => {
      if (this.props.hasProfile) {
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
        <LinkMenuItem
          id={`editProfile-${this.props.username}`}
          to={routeConverter(ROUTE_USER_PROFILE, { username: this.props.username })}
          label={editUserProfileLabel}
          className="UserListMenuAction__menu-item-edit-profile"
        />
        {renderViewProfile()}
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
  hasProfile: PropTypes.bool,
};

UserListMenuActions.defaultProps = {
  onClickDelete: () => {},
  onClickView: () => {},
  hasProfile: false,
};

export default UserListMenuActions;
