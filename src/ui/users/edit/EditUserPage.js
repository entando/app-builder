import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditFormContainer from 'ui/users/edit/EditFormContainer';
import { ROUTE_USER_LIST } from 'app-init/router';

const EditUserPage = () => (
  <InternalPage className="EditUserPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.userManagement" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_USER_LIST}>
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
          <EditFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditUserPage;
