import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import { Row, Col, CardGrid } from 'patternfly-react';

const DashboardPage = () => (
  <InternalPage className="DashboardPage">
    <CardGrid>
      <Row>
        <Col md={4}>
          <UserManagementContainer />
        </Col>
      </Row>
    </CardGrid>
  </InternalPage>
);

export default DashboardPage;
