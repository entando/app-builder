import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import CloneFormContainer from 'ui/pages/clone/CloneFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';


const PagesClonePage = () => (
  <InternalPage className="PagesClonePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.pageDesigner" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_PAGE_TREE}>
              <FormattedMessage id="menu.pageTree" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.clone" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId="app.clone" helpId="pageTreePage.help" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ErrorsAlertContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CloneFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default PagesClonePage;
