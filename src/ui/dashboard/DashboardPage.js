import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import UserManagement from 'ui/dashboard/UserManagement';
import { Row, Col, CardGrid } from 'patternfly-react';

const DashboardPage = () => (
  <InternalPage className="DashboardPage">
    <CardGrid>
      <Row>
        <Col md={4}>
          <UserManagement />
        </Col>
      </Row>
    </CardGrid>
  </InternalPage>
);

export default DashboardPage;
