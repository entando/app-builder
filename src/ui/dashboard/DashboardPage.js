import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, CardGrid } from 'patternfly-react';
import { compact } from 'lodash';

import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import UxPatternsContainer from 'ui/dashboard/UxPatternsContainer';
import LanguagesContainer from 'ui/dashboard/LanguagesContainer';
import PageStatusContainer from 'ui/dashboard/PageStatusContainer';
import PagesListContainer from 'ui/dashboard/PagesListContainer';

import {
  VIEW_USERS_AND_PROFILES_PERMISSION,
  CRUD_USERS_PERMISSION,
  MANAGE_PAGES_PERMISSION,
  ROLE_SUPERUSER,
} from 'state/permissions/const';

const topWidgetRequiredPermissions = [
  [CRUD_USERS_PERMISSION, VIEW_USERS_AND_PROFILES_PERMISSION],
  [MANAGE_PAGES_PERMISSION],
  [ROLE_SUPERUSER],
];

const DashboardPage = ({ userPermissions }) => {
  const topWidgetPermissions = topWidgetRequiredPermissions.map(required => (
    required.some(singlePermission => userPermissions.includes(singlePermission))
  ));
  const lengthNum = compact(topWidgetPermissions).length;
  const tileLength = lengthNum ? (12 / lengthNum) : 12;
  return (
    <InternalPage className="DashboardPage">
      <CardGrid>
        <Row>
          {topWidgetPermissions[0] && (
            <Col md={tileLength}>
              <UserManagementContainer />
            </Col>
          )}
          {topWidgetPermissions[1] && (
            <Col md={tileLength}>
              <UxPatternsContainer />
            </Col>
          )}
          {topWidgetPermissions[2] && (
            <Col md={tileLength}>
              <LanguagesContainer />
            </Col>
          )}
        </Row>
        {userPermissions.includes(MANAGE_PAGES_PERMISSION) && (
          <Row>
            <Col md={4}>
              <PageStatusContainer />
            </Col>
            <Col md={8}>
              <PagesListContainer />
            </Col>
          </Row>
        )}
      </CardGrid>
    </InternalPage>
  );
};

DashboardPage.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

DashboardPage.defaultProps = {
  userPermissions: [],
};

export default DashboardPage;
