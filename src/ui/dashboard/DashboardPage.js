import React from 'react';
import { Row, Col, CardGrid } from 'patternfly-react';
import withPermissions from 'ui/auth/withPermissions';
import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import UxPatternsContainer from 'ui/dashboard/UxPatternsContainer';
import LanguagesContainer from 'ui/dashboard/LanguagesContainer';
import PageStatusContainer from 'ui/dashboard/PageStatusContainer';
import PagesListContainer from 'ui/dashboard/PagesListContainer';
import ContentsStatusCardContainer from 'ui/contents/status-card/ContentsStatusCardContainer';
import ContentsListCardContainer from 'ui/contents/list-card/ContentListCardContainer';

import { ADMINISTRATION_AREA_PERMISSION } from 'state/permissions/const';

export const DashboardPageBody = () => (
  <InternalPage className="DashboardPage">
    <CardGrid className="container-fluid">
      <Row>
        <Col md={4}>
          <UserManagementContainer />
        </Col>
        <Col md={4}>
          <UxPatternsContainer />
        </Col>
        <Col md={4}>
          <LanguagesContainer />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <PageStatusContainer />
        </Col>
        <Col md={6}>
          {ContentsStatusCardContainer ? <ContentsStatusCardContainer /> : null}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PagesListContainer />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {ContentsListCardContainer ? <ContentsListCardContainer /> : null}
        </Col>
      </Row>
    </CardGrid>
  </InternalPage>
);

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(DashboardPageBody);
