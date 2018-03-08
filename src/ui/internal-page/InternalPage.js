import React from 'react';
import PropTypes from 'prop-types';
import {
  BrandMenu, ProjectLink, UserDropdown, HelpMenu, AdminAppSwitch, LinkMenuItem, FirstLevelMenuItem,
  formattedText,
} from 'frontend-common-components';

import { ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST } from 'app-init/router';

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
        route={ROUTE_DASHBOARD}
      />
      <FirstLevelMenuItem
        id="menu-page-creator"
        label={formattedText('menu.pageCreator', 'Page Creator')}
      >
        <LinkMenuItem
          id="menu-page-tree"
          label={formattedText('menu.pageTree', 'Page Tree')}
          route={ROUTE_PAGE_TREE}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-ux-pattern"
        label={formattedText('menu.uxPattern')}
      >
        <LinkMenuItem
          id="menu-ux-pattern-widgets"
          label={formattedText('menu.widgets')}
          route={ROUTE_WIDGET_LIST}
        />
        <LinkMenuItem
          id="menu-ux-pattern-fragments"
          label={formattedText('menu.fragments')}
          route={ROUTE_FRAGMENT_LIST}
        />
      </FirstLevelMenuItem>
      <LinkMenuItem
        id="menu-integration"
        label={formattedText('menu.integration', 'Integration')}
        route={ROUTE_DASHBOARD}
      />
      <LinkMenuItem
        id="menu-data"
        label={formattedText('menu.data', 'Data')}
        route={ROUTE_DASHBOARD}
      />
      <LinkMenuItem
        id="menu-configuration"
        label={formattedText('menu.configuration', 'Configuration')}
        route={ROUTE_DASHBOARD}
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
