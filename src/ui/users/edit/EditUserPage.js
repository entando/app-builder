import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import { ROUTE_USER_EDIT } from 'app-init/router';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';

const EditUserPage = () => (
  <InternalPage className="EditUserPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_USER_EDIT}>
              <FormattedMessage id="menu.users" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <PageTitle
        titleId="app.edit"
        helpId="user.help"
      />
      <Row>
        <Col xs={12}>
          Edit User
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditUserPage;
