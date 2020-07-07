import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, CardGrid } from 'patternfly-react';
import { compact } from 'lodash';
import { hasAccess, PermissionCheck } from '@entando/utils';
import withPermissions from 'ui/auth/withPermissions';
import InternalPage from 'ui/internal-page/InternalPage';
import UserManagementContainer from 'ui/dashboard/UserManagementContainer';
import UxPatternsContainer from 'ui/dashboard/UxPatternsContainer';
import LanguagesContainer from 'ui/dashboard/LanguagesContainer';
import PageStatusContainer from 'ui/dashboard/PageStatusContainer';
import PagesListContainer from 'ui/dashboard/PagesListContainer';

import apps from 'entando-apps';

import {
  ADMINISTRATION_AREA_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION,
  CRUD_USERS_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION,
  MANAGE_PAGES_PERMISSION,
  ROLE_SUPERUSER,
  VALIDATE_CONTENTS_PERMISSION,
  CRUD_CONTENTS_PERMISSION,
} from 'state/permissions/const';

const topWidgetRequiredPermissions = [
  [CRUD_USERS_PERMISSION, VIEW_USERS_AND_PROFILES_PERMISSION, EDIT_USER_PROFILES_PERMISSION],
  [MANAGE_PAGES_PERMISSION],
  [ROLE_SUPERUSER],
];

export const DashboardPageBody = ({ userPermissions }) => {
  const topWidgetPermissions = topWidgetRequiredPermissions.map(required => (
    hasAccess(required, userPermissions)
  ));
  const lengthNum = compact(topWidgetPermissions).length;
  const tileLength = lengthNum ? (12 / lengthNum) : 12;
  const ContentsStatusCardContainer = (apps.filter(app => app.id === 'cms')[0] || {}).contentsStatusCard;
  const canViewContentsStatus = hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions) ||
  hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions);
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
        <Row>
          <PermissionCheck
            requiredPermissions={MANAGE_PAGES_PERMISSION}
            userPermissions={userPermissions}
          >
            <Col md={4}>
              <PageStatusContainer />
            </Col>
          </PermissionCheck>
          <Col md={8}>
            {
              (canViewContentsStatus && ContentsStatusCardContainer) ?
                <ContentsStatusCardContainer /> : null
            }
          </Col>
        </Row>
        <PermissionCheck
          requiredPermissions={MANAGE_PAGES_PERMISSION}
          userPermissions={userPermissions}
        >
          <Row>
            <Col md={12}>
              <PagesListContainer />
            </Col>
          </Row>
        </PermissionCheck>

      </CardGrid>
    </InternalPage>
  );
};

DashboardPageBody.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

DashboardPageBody.defaultProps = {
  userPermissions: [],
};

export default withPermissions(ADMINISTRATION_AREA_PERMISSION)(DashboardPageBody);
