import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'patternfly-react';
import { formattedText } from '@entando/utils';
import {
  BrandMenu,
  AdminAppSwitch,
  LinkMenuItem,
  FirstLevelMenuItem,
} from '@entando/menu';

import UserMenuContainer from 'ui/internal-page/UserMenuContainer';

import {
  ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_DATA_TYPE_LIST, ROUTE_USER_LIST, ROUTE_GROUP_LIST,
  ROUTE_LABELS_AND_LANGUAGES, ROUTE_DATA_MODEL_LIST, ROUTE_CATEGORY_LIST, ROUTE_PAGE_MODEL_LIST,
  ROUTE_ROLE_LIST, ROUTE_RELOAD_CONFIG, ROUTE_DATABASE_LIST, ROUTE_FILE_BROWSER,
  ROUTE_USER_RESTRICTIONS, ROUTE_PAGE_SETTINGS, ROUTE_PROFILE_TYPE_LIST, ROUTE_DE_COMPONENT_LIST,
} from 'app-init/router';

import ActivityStreamMenuContainer from 'ui/activity-stream/ActivityStreamMenuContainer';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import IntegrationMenu from 'ui/internal-page/IntegrationMenu';
import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';
import pluginArray from 'entando-plugins';


const BRAND_LOGO = <img src="images/entando-logo.svg" alt="" />;

const menuHeader = [
  <HomePageLinkContainer key="projectLink" />,
  <ActivityStreamMenuContainer key="ActivityStreamMenu" />,
  <UserMenuContainer key="UserMenu" />,
  <AdminAppSwitch key="adminAppSwitch" />,
];

const integrationsMenuItem = pluginArray && pluginArray.length ? (
  <FirstLevelMenuItem
    id="menu-integration"
    label={formattedText('menu.integration', 'Integration')}
  >
    <IntegrationMenu />
  </FirstLevelMenuItem>
) : null;


const renderDigitalExchangeMenuItem = () => {
  if (process.env.ENABLE_DIGITAL_EXCHANGE_UI) {
    return (<LinkMenuItem
      id="digital-exchange"
      label={<span><Icon name="cart-plus" /><FormattedMessage id="digitalExchange.menuButton.title" /></span>}
      route={ROUTE_DE_COMPONENT_LIST}
      pullRight
    />);
  }

  return '';
};

const InternalPage = ({ className, children }) => (
  <div className={['InternalPage', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="App Builder 5.0" header={menuHeader} >
      <LinkMenuItem
        id="menu-dashboard"
        label={formattedText('menu.dashboard', 'Dashboard')}
        route={ROUTE_DASHBOARD}
      />
      <FirstLevelMenuItem
        id="menu-page-creator"
        label={formattedText('menu.pageDesigner', 'Page Designer')}
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
        <LinkMenuItem
          id="menu-page-settings"
          label={formattedText('menu.pageSettings')}
          route={ROUTE_PAGE_SETTINGS}
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
        <LinkMenuItem
          id="menu-ux-pattern-page-models"
          label={formattedText('menu.pageModels')}
          route={ROUTE_PAGE_MODEL_LIST}
        />
      </FirstLevelMenuItem>

      {integrationsMenuItem}

      <FirstLevelMenuItem
        id="menu-data"
        label={formattedText('menu.data')}
      >
        <LinkMenuItem
          id="menu-data-types"
          label={formattedText('menu.dataType')}
          route={ROUTE_DATA_TYPE_LIST}
        />
        <LinkMenuItem
          id="menu-data-models"
          label={formattedText('menu.dataModels')}
          route={ROUTE_DATA_MODEL_LIST}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-user-settings"
        label={formattedText('menu.userManagement')}
      >
        <LinkMenuItem
          id="menu-users"
          label={formattedText('menu.users')}
          route={ROUTE_USER_LIST}
        />
        <LinkMenuItem
          id="menu-roles"
          label={formattedText('menu.roles')}
          route={ROUTE_ROLE_LIST}
        />
        <LinkMenuItem
          id="menu-groups"
          label={formattedText('menu.groups')}
          route={ROUTE_GROUP_LIST}
        />
        <LinkMenuItem
          id="menu-profile"
          label={formattedText('menu.profileTypes')}
          route={ROUTE_PROFILE_TYPE_LIST}
        />
        <LinkMenuItem
          id="menu-user-restrictions"
          label={formattedText('menu.users.restrictions')}
          route={ROUTE_USER_RESTRICTIONS}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-configuration"
        label={<span><Icon name="cog" /> <FormattedMessage id="menu.configuration" /></span>}
        pullRight
      >
        <LinkMenuItem
          id="menu-categories"
          label={formattedText('menu.categories')}
          route={ROUTE_CATEGORY_LIST}
        />
        <LinkMenuItem
          id="menu-labels-languages"
          label={formattedText('menu.labelsAndLanguages')}
          route={ROUTE_LABELS_AND_LANGUAGES}
        />
        <LinkMenuItem
          id="menu-reload-configuration"
          label={formattedText('menu.reloadConfiguration')}
          route={ROUTE_RELOAD_CONFIG}
        />
        <LinkMenuItem
          id="menu-databases"
          label={formattedText('menu.database')}
          route={ROUTE_DATABASE_LIST}
        />
        <LinkMenuItem
          id="menu-labels-file-browser"
          label={formattedText('menu.fileBrowser')}
          route={ROUTE_FILE_BROWSER}
        />
      </FirstLevelMenuItem>

      {renderDigitalExchangeMenuItem()}

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
