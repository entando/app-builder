import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import UserAuthorityPageFormContainer from 'ui/users/authority/UserAuthorityPageFormContainer';

const UserAuthorityPage = () => (
  <InternalPage className="authorityPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.users.authority" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="user.authority.title"
            helpId="user.help"
          />
        </Col>
      </Row>
      <Row>
        <UserAuthorityPageFormContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default UserAuthorityPage;
