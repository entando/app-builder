import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from '@entando/router';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import UserListTableContainer from 'ui/users/list/UserListTableContainer';
import UserSearchFormContainer from 'ui/users/list/UserSearchFormContainer';
import { ROUTE_USER_ADD } from 'app-init/router';

const ListUserPage = () => (
  <InternalPage className="UserListPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="user.list.title"
            helpId="user.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6} xsOffset={3}>
          <UserSearchFormContainer />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Link route={ROUTE_USER_ADD}>
            <Button
              type="button"
              className="pull-right ListUserPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <UserListTableContainer />
      </Row>
      {/* Entity references placeholder */}
    </Grid>
  </InternalPage>
);

export default ListUserPage;
