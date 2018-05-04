import React from 'react';
import { Row, Col, CardGrid } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import UxPatternsContainer from 'ui/dashboard/UxPatternsContainer';
import IntegrationsContainer from 'ui/dashboard/IntegrationsContainer';
import PageStatusContainer from 'ui/dashboard/PageStatusContainer';

const DashboardPage = () => (
  <InternalPage className="DashboardPage">
    <CardGrid>
      <Row>
        <Col md={4}>
          <UserManagementContainer />
        </Col>
        <Col md={4}>
          <UxPatternsContainer />
        </Col>
        <Col md={4}>
          <IntegrationsContainer />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <PageStatusContainer />
        </Col>
      </Row>
    </CardGrid>
  </InternalPage>
);

export default DashboardPage;
