import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { PermissionCheck } from '@entando/utils';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import withPermissions from 'ui/auth/withPermissions';
import UserListTableContainer from 'ui/users/list/UserListTableContainer';
import UserSearchFormContainer from 'ui/users/list/UserSearchFormContainer';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { ROUTE_USER_ADD } from 'app-init/router';
import { CRUD_USERS_PERMISSION, VIEW_USERS_AND_PROFILES_PERMISSION } from 'state/permissions/const';
import { TEST_ID_USER_LIST_PAGE } from 'ui/test-const/user-test-const';

export const UserListPageBody = ({ userPermissions }) => (
  <InternalPage className="UserListPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.userManagement' },
      { label: 'menu.users', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.list.title"
            helpId="user.help"
          />
        </Col>
      </Row>
      <Row className="formRow">
        <Col xs={6}>
          <UserSearchFormContainer />
        </Col>
      </Row>
      <Row>
        <UserListTableContainer />
      </Row>
      <br />
      <Row>
        <Col md={12}>
          <PermissionCheck
            userPermissions={userPermissions}
            requiredPermissions={CRUD_USERS_PERMISSION}
          >
            <Link to={ROUTE_USER_ADD}>
              <Button
                type="button"
                className="pull-right ListUserPage__add"
                bsStyle="primary"
                data-testid={TEST_ID_USER_LIST_PAGE.ADD_USER_BUTTON}
              >
                <FormattedMessage
                  id="app.add"
                />
              </Button>
            </Link>
          </PermissionCheck>
        </Col>
      </Row>
      {/* Entity references placeholder */}
    </Grid>
  </InternalPage>
);

UserListPageBody.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UserListPageBody.defaultProps = {
  userPermissions: [],
};

export default
withPermissions([VIEW_USERS_AND_PROFILES_PERMISSION, CRUD_USERS_PERMISSION])(UserListPageBody);
