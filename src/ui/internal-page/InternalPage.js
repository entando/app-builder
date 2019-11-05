import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'patternfly-react';
import {
  BrandMenu,
  FirstLevelMenuItem,
  LinkMenuItem,
} from '@entando/menu';
import { routeConverter } from '@entando/utils';

import UserMenuContainer from 'ui/internal-page/UserMenuContainer';

import {
  ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_DATA_TYPE_LIST, ROUTE_USER_LIST, ROUTE_GROUP_LIST,
  ROUTE_LABELS_AND_LANGUAGES, ROUTE_DATA_MODEL_LIST, ROUTE_CATEGORY_LIST, ROUTE_PAGE_MODEL_LIST,
  ROUTE_ROLE_LIST, ROUTE_RELOAD_CONFIG, ROUTE_DATABASE_LIST, ROUTE_FILE_BROWSER,
  ROUTE_USER_RESTRICTIONS, ROUTE_PAGE_SETTINGS, ROUTE_PROFILE_TYPE_LIST, ROUTE_DE_COMPONENT_LIST,
} from 'app-init/router';

import apps from 'entando-apps';

import ActivityStreamMenuContainer from 'ui/activity-stream/ActivityStreamMenuContainer';
import ActivityStreamContainer from 'ui/activity-stream/ActivityStreamContainer';
import NotificationListContainer from 'ui/activity-stream/NotificationListContainer';
import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';

const publicUrl = process.env.PUBLIC_URL;
const BRAND_LOGO = <img src={`${publicUrl}/images/entando-logo.svg`} alt="" />;

const menuHeader = [
  <HomePageLinkContainer key="projectLink" />,
  <ActivityStreamMenuContainer key="ActivityStreamMenu" />,
  <UserMenuContainer key="UserMenu" />,
];

const appMenuItems = Object.values(apps).map(App => (
  <FirstLevelMenuItem
    id={App.id}
    label={<FormattedMessage id={`${App.id}.title`} />}
  >
    <App.menu />
  </FirstLevelMenuItem>
));

const { DIGITAL_EXCHANGE_UI_ENABLED } = process.env;

const digitalExchangeMenuItem = DIGITAL_EXCHANGE_UI_ENABLED ? (<LinkMenuItem
  id="digital-exchange"
  label={<span><Icon name="cart-plus" /><FormattedMessage id="digitalExchange.menuButton.title" /></span>}
  to={ROUTE_DE_COMPONENT_LIST}
  pullRight
  isNav
/>) : '';

const InternalPage = ({ className, children }) => (
  <div className={['InternalPage', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="App Builder 5.0" header={menuHeader} >
      <LinkMenuItem
        id="menu-dashboard"
        to={ROUTE_DASHBOARD}
        label={<FormattedMessage id="menu.dashboard" defaultMessage="Dashboard" />}
        isNav
      />
      <FirstLevelMenuItem
        id="menu-page-creator"
        label={<FormattedMessage id="menu.pageDesigner" defaultMessage="Page Designer" />}
      >
        <LinkMenuItem
          id="menu-page-tree"
          to={ROUTE_PAGE_TREE}
          label={<FormattedMessage id="menu.pageTree" defaultMessage="Page Tree" />}
          isNav
        />
        <LinkMenuItem
          id="menu-page-config"
          to={routeConverter(ROUTE_PAGE_CONFIG, { pageCode: 'homepage' })}
          label={<FormattedMessage id="menu.pageConfig" />}
          isNav
        />
        <LinkMenuItem
          id="menu-page-settings"
          to={ROUTE_PAGE_SETTINGS}
          label={<FormattedMessage id="menu.pageSettings" />}
          isNav
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-ux-pattern"
        label={<FormattedMessage id="menu.uxPattern" />}
      >
        <LinkMenuItem
          id="menu-ux-pattern-widgets"
          to={ROUTE_WIDGET_LIST}
          label={<FormattedMessage id="menu.widgets" />}
          isNav
        />
        <LinkMenuItem
          id="menu-ux-pattern-fragments"
          to={ROUTE_FRAGMENT_LIST}
          label={<FormattedMessage id="menu.fragments" />}
          isNav
        />
        <LinkMenuItem
          id="menu-ux-pattern-page-models"
          label={<FormattedMessage id="menu.pageModels" />}
          to={ROUTE_PAGE_MODEL_LIST}
          isNav
        />
      </FirstLevelMenuItem>

      <FirstLevelMenuItem
        id="menu-data"
        label={<FormattedMessage id="menu.data" />}
      >
        <LinkMenuItem
          id="menu-data-types"
          label={<FormattedMessage id="menu.dataType" />}
          to={ROUTE_DATA_TYPE_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-data-models"
          label={<FormattedMessage id="menu.dataModels" />}
          to={ROUTE_DATA_MODEL_LIST}
          isNav
        />
      </FirstLevelMenuItem>
      <FirstLevelMenuItem
        id="menu-user-settings"
        label={<FormattedMessage id="menu.userManagement" />}
      >
        <LinkMenuItem
          id="menu-users"
          label={<FormattedMessage id="menu.users" />}
          to={ROUTE_USER_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-roles"
          label={<FormattedMessage id="menu.roles" />}
          to={ROUTE_ROLE_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-groups"
          label={<FormattedMessage id="menu.groups" />}
          to={ROUTE_GROUP_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-profile"
          label={<FormattedMessage id="menu.profileTypes" />}
          to={ROUTE_PROFILE_TYPE_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-user-restrictions"
          label={<FormattedMessage id="menu.users.restrictions" />}
          to={ROUTE_USER_RESTRICTIONS}
          isNav
        />
      </FirstLevelMenuItem>

      {appMenuItems}

      <FirstLevelMenuItem
        id="menu-configuration"
        label={<span><Icon name="cog" /> <FormattedMessage id="menu.configuration" /></span>}
        pullRight
      >
        <LinkMenuItem
          id="menu-categories"
          label={<FormattedMessage id="menu.categories" />}
          to={ROUTE_CATEGORY_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-labels-languages"
          label={<FormattedMessage id="menu.labelsAndLanguages" />}
          to={ROUTE_LABELS_AND_LANGUAGES}
          isNav
        />
        <LinkMenuItem
          id="menu-reload-configuration"
          label={<FormattedMessage id="menu.reloadConfiguration" />}
          to={ROUTE_RELOAD_CONFIG}
          isNav
        />
        <LinkMenuItem
          id="menu-databases"
          label={<FormattedMessage id="menu.database" />}
          to={ROUTE_DATABASE_LIST}
          isNav
        />
        <LinkMenuItem
          id="menu-labels-file-browser"
          label={<FormattedMessage id="menu.fileBrowser" />}
          to={ROUTE_FILE_BROWSER}
          isNav
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
