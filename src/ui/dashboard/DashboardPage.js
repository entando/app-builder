import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, CardGrid } from 'patternfly-react';
import { compact } from 'lodash';
import withPermissions from 'ui/auth/withPermissions';

import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import UxPatternsContainer from 'ui/dashboard/UxPatternsContainer';
import LanguagesContainer from 'ui/dashboard/LanguagesContainer';
import PageStatusContainer from 'ui/dashboard/PageStatusContainer';
import PagesListContainer from 'ui/dashboard/PagesListContainer';

import {
  ADMINISTRATION_AREA_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION,
  CRUD_USERS_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION,
  MANAGE_PAGES_PERMISSION,
  ROLE_SUPERUSER,
} from 'state/permissions/const';

const topWidgetRequiredPermissions = [
  [CRUD_USERS_PERMISSION, VIEW_USERS_AND_PROFILES_PERMISSION, EDIT_USER_PROFILES_PERMISSION],
  [MANAGE_PAGES_PERMISSION],
  [ROLE_SUPERUSER],
];

export const DashboardPageBody = ({ isSuperuser, canUser, hasSomePermissions }) => {
  const topWidgetPermissions = topWidgetRequiredPermissions.map(required => (
    hasSomePermissions(required)
  ));
  const lengthNum = compact(topWidgetPermissions).length;
  const tileLength = lengthNum ? (12 / lengthNum) : 12;
  const pageListTileSize = isSuperuser ? 8 : 12;
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
        {canUser(MANAGE_PAGES_PERMISSION) && (
          <Row>
            {isSuperuser && (
              <Col md={4}>
                <PageStatusContainer />
              </Col>
            )}
            <Col md={pageListTileSize}>
              <PagesListContainer />
            </Col>
          </Row>
        )}
      </CardGrid>
    </InternalPage>
  );
};

DashboardPageBody.propTypes = {
  isSuperuser: PropTypes.bool.isRequired,
  canUser: PropTypes.func.isRequired,
  hasSomePermissions: PropTypes.func.isRequired,
};

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(DashboardPageBody);
