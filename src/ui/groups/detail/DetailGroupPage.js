import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import GroupDetailTableContainer from 'ui/groups/detail/GroupDetailTableContainer';
import { ROUTE_GROUP_LIST } from 'app-init/router';

const DetailGroupPage = () => (
  <InternalPage className="DetailGroupPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_GROUP_LIST}>
              <FormattedMessage id="menu.groups" />
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
            helpId="group.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <GroupDetailTableContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default DetailGroupPage;
