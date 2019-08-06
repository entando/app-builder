import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DetailRoleTableContainer from 'ui/roles/detail/DetailRoleTableContainer';
import { ROUTE_ROLE_LIST } from 'app-init/router';

const DetailRolePage = () => (
  <InternalPage className="DetailRolePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem to={ROUTE_ROLE_LIST}>
              <FormattedMessage id="menu.roles" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.details" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.details"
            helpId="role.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DetailRoleTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default DetailRolePage;
