import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'patternfly-react';
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
  ROUTE_CMS_CONTENT_LIST, ROUTE_CMS_CONTENT_TYPES, ROUTE_CMS_CONTENT_MODELS,
  ROUTE_CMS_CONTENT_SETTINGS,
  ROUTE_PLUGINS,
} from 'app-init/router';

import ActivityStreamMenuContainer from 'ui/activity-stream/ActivityStreamMenuContainer';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';


const BRAND_LOGO = <img src="images/entando-logo.svg" alt="" />;

const menuHeader = [
  <HomePageLinkContainer key="projectLink" />,
  <ActivityStreamMenuContainer key="ActivityStreamMenu" />,
  <UserMenuContainer key="UserMenu" />,
  <AdminAppSwitch key="adminAppSwitch" />,
];

const { DIGITAL_EXCHANGE_UI_ENABLED, CMS_UI_ENABLED } = process.env;

const digitalExchangeMenuItem = DIGITAL_EXCHANGE_UI_ENABLED ? (<LinkMenuItem
  id="digital-exchange"
  label={<span><Icon name="cart-plus" /><FormattedMessage id="digitalExchange.menuButton.title" /></span>}
  route={ROUTE_DE_COMPONENT_LIST}
  pullRight
/>) : '';

const cmsMenuItems = CMS_UI_ENABLED ? (
  <FirstLevelMenuItem
    id="menu-cms"
    label={<FormattedMessage id="menu.cms" />}
  >
    <LinkMenuItem
      id="menu-cms-content-list"
      label={<FormattedMessage id="menu.cms.contentList" />}
      route={ROUTE_CMS_CONTENT_LIST}
    />
    <LinkMenuItem
      id="menu-roles"
      label={<FormattedMessage id="menu.cms.contentTypes" />}
      route={ROUTE_CMS_CONTENT_TYPES}
    />
    <LinkMenuItem
      id="menu-groups"
      label={<FormattedMessage id="menu.cms.contentModels" />}
      route={ROUTE_CMS_CONTENT_MODELS}
    />
    <LinkMenuItem
      id="menu-profile"
      label={<FormattedMessage id="menu.cms.contentSettings" />}
      route={ROUTE_CMS_CONTENT_SETTINGS}
    />
  </FirstLevelMenuItem>) : '';

const InternalPage = ({ className, children }) => (
  <div className={['InternalPage', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="App Builder 5.0" header={menuHeader} >
      <LinkMenuItem
        id="menu-dashboard"
        label={<FormattedMessage id="menu.dashboard" defaultMessage="Dashboard" />}
        route={ROUTE_DASHBOARD}
      />
      <FirstLevelMenuItem
        id="menu-page-creator"
        label={<FormattedMessage id="menu.pageDesigner" defaultMessage="Page Designer" />}
      >
        <LinkMenuItem
          id="menu-page-tree"
          label={<FormattedMessage id="menu.pageTree" defaultMessage="Page Tree" />}
          route={ROUTE_PAGE_TREE}
        />
        <LinkMenuItem
          id="menu-page-config"
          label={<FormattedMessage id="menu.pageConfig" />}
          route={ROUTE_PAGE_CONFIG}
          params={{ pageCode: 'homepage' }}
        />
        <LinkMenuItem
          id="menu-page-settings"
          label={<FormattedMessage id="menu.pageSettings" />}
          route={ROUTE_PAGE_SETTINGS}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-ux-pattern"
        label={<FormattedMessage id="menu.uxPattern" />}
      >
        <LinkMenuItem
          id="menu-ux-pattern-widgets"
          label={<FormattedMessage id="menu.widgets" />}
          route={ROUTE_WIDGET_LIST}
        />
        <LinkMenuItem
          id="menu-ux-pattern-fragments"
          label={<FormattedMessage id="menu.fragments" />}
          route={ROUTE_FRAGMENT_LIST}
        />
        <LinkMenuItem
          id="menu-ux-pattern-page-models"
          label={<FormattedMessage id="menu.pageModels" />}
          route={ROUTE_PAGE_MODEL_LIST}
        />
      </FirstLevelMenuItem>

      <LinkMenuItem
        id="menu-integrations"
        label={<FormattedMessage id="menu.integrations" defaultMessage="Integrations" />}
        route={ROUTE_PLUGINS}
      />

      <FirstLevelMenuItem
        id="menu-data"
        label={<FormattedMessage id="menu.data" />}
      >
        <LinkMenuItem
          id="menu-data-types"
          label={<FormattedMessage id="menu.dataType" />}
          route={ROUTE_DATA_TYPE_LIST}
        />
        <LinkMenuItem
          id="menu-data-models"
          label={<FormattedMessage id="menu.dataModels" />}
          route={ROUTE_DATA_MODEL_LIST}
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-user-settings"
        label={<FormattedMessage id="menu.userManagement" />}
      >
        <LinkMenuItem
          id="menu-users"
          label={<FormattedMessage id="menu.users" />}
          route={ROUTE_USER_LIST}
        />
        <LinkMenuItem
          id="menu-roles"
          label={<FormattedMessage id="menu.roles" />}
          route={ROUTE_ROLE_LIST}
        />
        <LinkMenuItem
          id="menu-groups"
          label={<FormattedMessage id="menu.groups" />}
          route={ROUTE_GROUP_LIST}
        />
        <LinkMenuItem
          id="menu-profile"
          label={<FormattedMessage id="menu.profileTypes" />}
          route={ROUTE_PROFILE_TYPE_LIST}
        />
        <LinkMenuItem
          id="menu-user-restrictions"
          label={<FormattedMessage id="menu.users.restrictions" />}
          route={ROUTE_USER_RESTRICTIONS}
        />
      </FirstLevelMenuItem>

      {cmsMenuItems}

      <FirstLevelMenuItem
        id="menu-configuration"
        label={<span><Icon name="cog" /> <FormattedMessage id="menu.configuration" /></span>}
        pullRight
      >
        <LinkMenuItem
          id="menu-categories"
          label={<FormattedMessage id="menu.categories" />}
          route={ROUTE_CATEGORY_LIST}
        />
        <LinkMenuItem
          id="menu-labels-languages"
          label={<FormattedMessage id="menu.labelsAndLanguages" />}
          route={ROUTE_LABELS_AND_LANGUAGES}
        />
        <LinkMenuItem
          id="menu-reload-configuration"
          label={<FormattedMessage id="menu.reloadConfiguration" />}
          route={ROUTE_RELOAD_CONFIG}
        />
        <LinkMenuItem
          id="menu-databases"
          label={<FormattedMessage id="menu.database" />}
          route={ROUTE_DATABASE_LIST}
        />
        <LinkMenuItem
          id="menu-labels-file-browser"
          label={<FormattedMessage id="menu.fileBrowser" />}
          route={ROUTE_FILE_BROWSER}
        />
      </FirstLevelMenuItem>

      {digitalExchangeMenuItem}

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
