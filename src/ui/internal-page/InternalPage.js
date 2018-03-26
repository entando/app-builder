import React from 'react';
import PropTypes from 'prop-types';
import {
  BrandMenu, ProjectLink, UserDropdown, HelpMenu, AdminAppSwitch, LinkMenuItem, FirstLevelMenuItem,
  formattedText,
} from 'frontend-common-components';

import {
  ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_DATA_TYPE_LIST, ROUTE_USER_LIST, ROUTE_GROUP_LIST,
  ROUTE_LABELS_AND_LANGUAGES,
} from 'app-init/router';

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
        <LinkMenuItem
          id="menu-page-config"
          label={formattedText('menu.pageConfig')}
          route={ROUTE_PAGE_CONFIG}
          params={{ pageCode: 'homepage' }}
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
      <FirstLevelMenuItem
        id="menu-data"
        label={formattedText('menu.data')}
      >
        <LinkMenuItem
          id="menu-data-types"
          label={formattedText('menu.dataType')}
          route={ROUTE_DATA_TYPE_LIST}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-user-settings"
        label={formattedText('menu.userSettings')}
      >
        <LinkMenuItem
          id="menu-users"
          label={formattedText('menu.users')}
          route={ROUTE_USER_LIST}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-configuration"
        label={formattedText('menu.configuration', 'Configuration')}
        pullRight
      >
        <LinkMenuItem
          id="menu-labels-languages"
          label={formattedText('menu.labelsAndLanguages')}
          route={ROUTE_LABELS_AND_LANGUAGES}
        />
        <LinkMenuItem
          id="menu-groups"
          label={formattedText('menu.groups')}
          route={ROUTE_GROUP_LIST}
        />
      </FirstLevelMenuItem>
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
