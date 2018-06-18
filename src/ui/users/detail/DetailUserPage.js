import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_USER_LIST } from 'app-init/router';
import DetailUserTableContainer from 'ui/users/detail/DetailUserTableContainer';

const DetailUserPage = () => (
  <InternalPage className="DetailUserPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_USER_LIST}>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.details" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.details"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          <DetailUserTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);
export default DetailUserPage;
