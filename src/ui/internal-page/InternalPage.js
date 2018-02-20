import React from 'react';
import PropTypes from 'prop-types';
import {
  BrandMenu,
  ProjectLink,
  UserDropdown,
  HelpMenu,
  AdminAppSwitch,
  LinkMenuItem,
  formattedText } from 'frontend-common-components';

import ActivityStreamMenuContainer from 'ui/activity-stream/ActivityStreamMenuContainer';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';

const PROJECT_LINK = 'http://www.entando.com';
const PROJECT_NAME = 'ENTANDO';
const USERNAME = 'Admin';

const TITLE = 'Title';
const menuHeader = [
  <ProjectLink key="projectLink" projectLink={PROJECT_LINK} projectName={PROJECT_NAME} />,
  <ActivityStreamMenuContainer key="ActivityStreamMenu" />,
  <UserDropdown key="userDropdown" userName={USERNAME} />,
  <AdminAppSwitch key="adminAppSwitch" />,
  <HelpMenu key="helpMenu" />,
];

const InternalPage = ({ className, children }) => (
  <div className={['InternalPage', className].join(' ').trim()}>
    <BrandMenu title={TITLE} header={menuHeader} >
      <LinkMenuItem
        id="menu-dashboard"
        label={formattedText('menu.dashboard', 'Dashboard')}
        route="dashboard"
      />
      <LinkMenuItem
        id="menu-page-creator"
        label={formattedText('menu.pageCreator', 'Page Creator')}
        route="dashboard"
      />
      <LinkMenuItem
        id="menu-ux-pattern"
        label={formattedText('menu.uxPattern', 'UX Pattern')}
        route="dashboard"
      />
      <LinkMenuItem
        id="menu-integration"
        label={formattedText('menu.integration', 'Integration')}
        route="dashboard"
      />
      <LinkMenuItem
        id="menu-data"
        label={formattedText('menu.data', 'Data')}
        route="dashboard"
      />
      <LinkMenuItem
        id="menu-configuration"
        label={formattedText('menu.configuration', 'Configuration')}
        route="dashboard"
        pullRight
      />
    </BrandMenu>
    <ActivityStreamContainer >
      <NotificationListContainer />
    </ActivityStreamContainer>

    {children}
  </div>
);

InternalPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

InternalPage.defaultProps = {
  children: null,
  className: '',
};

export default InternalPage;
