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
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';

import { ROUTE_USER_ADD } from 'app-init/router';

class UserManagement extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { userPermissions } = this.props;
    return (
      <Card accented>
        <CardTitle>
          <Icon size="lg" name="user" />
          <FormattedMessage id="menu.userManagement" />
          {userPermissions.includes(CRUD_USERS_PERMISSION) && (
            <Button
              className="pull-right"
              componentClass={Link}
              to={ROUTE_USER_ADD}
              bsStyle="primary"
            >
              <FormattedMessage id="app.new" />
            </Button>
          )}
          <Clearfix />
        </CardTitle>
        <CardBody>
          <Icon size="lg" name="user" />
          <AggregateStatusCount>
            <b>{this.props.users}</b> <FormattedMessage id="menu.users" />
          </AggregateStatusCount>
          <Icon size="lg" name="users" />
          <AggregateStatusCount>
            <b>{this.props.groups}</b> <FormattedMessage id="menu.groups" />
          </AggregateStatusCount>
        </CardBody>
      </Card>
    );
  }
}

UserManagement.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  users: PropTypes.number.isRequired,
  groups: PropTypes.number.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UserManagement.defaultProps = {
  userPermissions: [],
};

export default UserManagement;
