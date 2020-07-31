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
import { PermissionCheck } from '@entando/utils';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';

import { ROUTE_USER_ADD } from 'app-init/router';

class UserManagement extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const {
      isSuperuser,
      users,
      groups,
      userPermissions,
    } = this.props;
    return (
      <Card accented>
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
            <b>{users}</b> <FormattedMessage id="menu.users" />
          </AggregateStatusCount>
          {isSuperuser && (
            <React.Fragment>
              <Icon size="lg" name="users" />
              <AggregateStatusCount>
                <b>{groups}</b> <FormattedMessage id="menu.groups" />
              </AggregateStatusCount>
            </React.Fragment>
          )}
        </CardBody>
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
