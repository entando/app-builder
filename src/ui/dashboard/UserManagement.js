import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
  Icon,
  Button,
} from 'patternfly-react';
import { PermissionCheck, hasAccess } from '@entando/utils';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  CRUD_USERS_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION,
} from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

import { ROUTE_GROUP_LIST, ROUTE_USER_ADD, ROUTE_USER_LIST } from 'app-init/router';

const viewPermissions = [
  CRUD_USERS_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION,
];

class UserManagement extends Component {
  componentDidMount() {
    const { onDidMount, userPermissions } = this.props;
    if (hasAccess(viewPermissions, userPermissions)) {
      onDidMount();
    }
  }

  render() {
    const {
      isSuperuser,
      users,
      groups,
      userPermissions,
    } = this.props;

    return (
      <Card accented className="UserManagementCard">
        <ViewPermissionNoticeOverlay viewPermissions={viewPermissions}>
          <CardTitle>
            <Icon size="lg" name="user" />
            <FormattedMessage id="menu.userManagement" />
            <PermissionCheck
              userPermissions={userPermissions}
              requiredPermissions={CRUD_USERS_PERMISSION}
            >
              <Button
                className="pull-right"
                componentClass={Link}
                to={ROUTE_USER_ADD}
                bsStyle="primary"
              >
                <FormattedMessage id="app.add" />
              </Button>
            </PermissionCheck>
            <Clearfix />
          </CardTitle>
          <CardBody>
            <Icon size="lg" name="user" />
            <AggregateStatusCount>
              <b>{users}</b>&nbsp;
              <Link to={ROUTE_USER_LIST}>
                <FormattedMessage id="menu.userManagement" />
              </Link>
            </AggregateStatusCount>
            {isSuperuser && (
              <React.Fragment>
                <Icon size="lg" name="users" />
                <AggregateStatusCount>
                  <b>{groups}</b>&nbsp;
                  <Link to={ROUTE_GROUP_LIST}>
                    <FormattedMessage id="menu.groups" />
                  </Link>
                </AggregateStatusCount>
              </React.Fragment>
            )}
          </CardBody>
        </ViewPermissionNoticeOverlay>
      </Card>
    );
  }
}

UserManagement.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  users: PropTypes.number.isRequired,
  groups: PropTypes.number.isRequired,
  isSuperuser: PropTypes.bool,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UserManagement.defaultProps = {
  isSuperuser: true,
  userPermissions: [],
};

export default UserManagement;
