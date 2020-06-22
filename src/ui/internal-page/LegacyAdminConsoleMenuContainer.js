/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Icon, VerticalNav } from 'patternfly-react';
import {
  // BrandMenu,
  FirstLevelMenuItem,
  LinkMenuItem,
} from '@entando/menu';
import { routeConverter, hasAccess } from '@entando/utils';

import UserMenuContainer from 'ui/internal-page/UserMenuContainer';
import LanguageSelectContainer from 'ui/internal-page/LanguageSelectContainer';

import {
  ROUTE_DASHBOARD, ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_DATA_TYPE_LIST, ROUTE_USER_LIST, ROUTE_GROUP_LIST,
  ROUTE_LABELS_AND_LANGUAGES, ROUTE_DATA_MODEL_LIST, ROUTE_CATEGORY_LIST, ROUTE_PAGE_TEMPLATE_LIST,
  ROUTE_ROLE_LIST, ROUTE_RELOAD_CONFIG, ROUTE_DATABASE_LIST, ROUTE_FILE_BROWSER,
  ROUTE_USER_RESTRICTIONS, ROUTE_PAGE_SETTINGS, ROUTE_PROFILE_TYPE_LIST, ROUTE_ECR_COMPONENT_LIST,
  ROUTE_CMS_VERSIONING,
} from 'app-init/router';

import apps from 'entando-apps';

import ActivityStreamMenuContainer from 'ui/activity-stream/ActivityStreamMenuContainer';
import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';
import {
  ROLE_SUPERUSER, MANAGE_PAGES_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION, CRUD_USERS_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION, CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION, MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

import { withPermissionValues } from 'ui/auth/withPermissions';

const {
  Masthead, Item, SecondaryItem, TertiaryItem,
} = VerticalNav;

// const publicUrl = process.env.PUBLIC_URL;
// const BRAND_LOGO = <img src={`${publicUrl}/images/topbar-logo.svg`} alt="" />;
const CMS_APP_ID = 'cms';

// eslint-disable-next-line no-unused-vars
const menuHeader = [
  <LanguageSelectContainer key="LanguageSelect" />,
  <HomePageLinkContainer key="projectLink" />,
  <ActivityStreamMenuContainer key="ActivityStreamMenu" />,
  <UserMenuContainer key="UserMenu" />,
];

const renderAppMenuItems = (intl, userPermissions) => Object.values(apps).map((App) => {
  let render = true;
  if (App.id === CMS_APP_ID) {
    if (
      !hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions) &&
      !hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions) &&
      !hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions)) {
      render = false;
    }
  }
  return render && (
  <Item
    id={App.id}
    key={App.id}
    onClick={() => {}}
    iconClass="fa fa-file-text-o"
    title={intl.formatMessage({ id: `${App.id}.title` })}
  >
    <SecondaryItem
      title={intl.formatMessage({ id: 'menu.apps', defaultMessage: 'Apps' })}
      onClick={() => {}}
    >
      <App.menu userPermissions={userPermissions} />
    </SecondaryItem>
  </Item>
  );
});

const { COMPONENT_REPOSITORY_UI_ENABLED } = process.env;

const ComponentRepositoryMenuItem = COMPONENT_REPOSITORY_UI_ENABLED ? (<LinkMenuItem
  id="component-repository"
  label={<span><Icon name="cart-plus" /><FormattedMessage id="componentRepository.menuButton.title" /></span>}
  to={ROUTE_ECR_COMPONENT_LIST}
  pullRight
  isNav
/>) : '';

const LegacyAdminConsoleMenuBody = ({ userPermissions, intl, history }) => (
  <VerticalNav
    blurDelay={700}
    blurDisabled={false}
    dynamicBodyClasses
    forceHidden={false}
    hiddenIcons={false}
    hideMasthead={false}
    hoverDelay={500}
    hoverDisabled={false}
    items={null}
    masthead={null}
    onCollapse={null}
    onExpand={null}
    onItemBlur={null}
    onItemClick={null}
    onItemHover={null}
    onItemPin={null}
    onMenuToggleClick={null}
    onMobileSelection={null}
    onNavigate={e => e.onClick()}
    persist
    persistentSecondary
    pinnableMenus={false}
    showBadges
  >
    <Masthead title="Patternfly React" />
    {
      hasAccess(MANAGE_PAGES_PERMISSION, userPermissions) && (
        <Item
          id="menu-page-creator"
          onClick={() => {}}
          iconClass="fa fa-files-o"
          title={intl.formatMessage({ id: 'menu.pageDesigner', defaultMessage: 'Page Designer' })}
        >
          <SecondaryItem
            id="menu-page-tree"
            title={intl.formatMessage({ id: 'menu.pageTree', defaultMessage: 'Page Tree' })}
            onClick={() => history.push(ROUTE_PAGE_TREE)}
          />
          <SecondaryItem
            id="menu-page-config"
            title={intl.formatMessage({ id: 'menu.pageConfig', defaultMessage: 'Page Configuration' })}
            onClick={() => history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: 'homepage' }))}
          />
          {
            hasAccess(ROLE_SUPERUSER, userPermissions) && (
              <SecondaryItem
                id="menu-page-settings"
                title={intl.formatMessage({ id: 'menu.pageSettings', defaultMessage: 'Page Settings' })}
                onClick={() => history.push(ROUTE_PAGE_SETTINGS)}
              />
            )
          }
        </Item>
      )
    }
    {
      hasAccess(MANAGE_PAGES_PERMISSION, userPermissions) && (
        <Item
          id="menu-ux-pattern"
          onClick={() => {}}
          iconClass="fa fa-object-ungroup"
          title={intl.formatMessage({ id: 'menu.uxPattern', defaultMessage: 'UX Pattern' })}
        >
          <SecondaryItem
            id="menu-ux-pattern-widgets"
            title={intl.formatMessage({ id: 'menu.widget', defaultMessage: 'Widget' })}
            onClick={() => history.push(ROUTE_WIDGET_LIST)}
          />
          {
          hasAccess(ROLE_SUPERUSER, userPermissions) && (
            <SecondaryItem
              id="menu-ux-pattern-fragments"
              title={intl.formatMessage({ id: 'menu.fragments', defaultMessage: 'Fragments' })}
              onClick={() => history.push(ROUTE_FRAGMENT_LIST)}
            />
          )
        }
          {
          hasAccess(ROLE_SUPERUSER, userPermissions) && (
            <SecondaryItem
              id="menu-ux-pattern-page-templates"
              title={intl.formatMessage({ id: 'menu.pageTemplates', defaultMessage: 'Page Templates' })}
              onClick={() => history.push(ROUTE_PAGE_TEMPLATE_LIST)}
            />
          )
        }
        </Item>
      )
    }
    {
      (hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions) ||
      hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions))
      && (
        <Item
          onClick={() => {}}
          iconClass="fa fa-cubes"
          title={intl.formatMessage({ id: 'menu.integrations', defaultMessage: 'Integrations' })}
        >
          <SecondaryItem
            title={intl.formatMessage({ id: 'menu.components', defaultMessage: 'Components' })}
            onClick={() => {}}
          >
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.versioning', defaultMessage: 'Versioning' })}
              onClick={() => history.push(ROUTE_CMS_VERSIONING)}
            />
          </SecondaryItem>
          <SecondaryItem
            title={intl.formatMessage({ id: 'menu.apiManagement', defaultMessage: 'API Management' })}
            onClick={() => history.push(ROUTE_FRAGMENT_LIST)}
          >
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.resources', defaultMessage: 'Resources' })}
              onClick={() => {}}
            />
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.services', defaultMessage: 'Services' })}
              onClick={() => {}}
            />
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.consumers', defaultMessage: 'Consumers' })}
              onClick={() => {}}
            />
          </SecondaryItem>
        </Item>
      )
    }
    {
      (
        hasAccess(EDIT_USER_PROFILES_PERMISSION, userPermissions) ||
        hasAccess(CRUD_USERS_PERMISSION, userPermissions) ||
        hasAccess(VIEW_USERS_AND_PROFILES_PERMISSION, userPermissions)
      ) && (
        <Item
          id="menu-user-settings"
          onClick={() => {}}
          iconClass="fa fa-users"
          title={intl.formatMessage({ id: 'menu.userManagement', defaultMessage: 'User Settings' })}
        >
          <SecondaryItem
            id="menu-users"
            title={intl.formatMessage({ id: 'menu.users', defaultMessage: 'Users' })}
            onClick={() => history.push(ROUTE_USER_LIST)}
          />
          <SecondaryItem
            id="menu-profile"
            title={intl.formatMessage({ id: 'menu.profileTypes', defaultMessage: 'Profile Types' })}
            onClick={() => history.push(ROUTE_PROFILE_TYPE_LIST)}
          />
          <SecondaryItem
            id="menu-user-restrictions"
            title={intl.formatMessage({ id: 'menu.users.restrictions', defaultMessage: 'User Restriction' })}
            onClick={() => history.push(ROUTE_USER_RESTRICTIONS)}
          />
          <SecondaryItem
            id="menu-roles"
            title={intl.formatMessage({ id: 'menu.roles', defaultMessage: 'Roles' })}
            onClick={() => history.push(ROUTE_ROLE_LIST)}
          />
        </Item>
      )
    }
    {
      hasAccess(ROLE_SUPERUSER, userPermissions)
      && (
        <Item
          id="menu-data"
          onClick={() => {}}
          iconClass="fa fa-file-text-o"
          title={intl.formatMessage({ id: 'menu.data', defaultMessage: 'Date' })}
        >
          <SecondaryItem
            id="menu-data-types"
            title={intl.formatMessage({ id: 'menu.dataType', defaultMessage: 'Data Type' })}
            onClick={() => history.push(ROUTE_DATA_TYPE_LIST)}
          />
          <SecondaryItem
            id="menu-data-models"
            title={intl.formatMessage({ id: 'menu.dataModels', defaultMessage: 'Data Model' })}
            onClick={() => history.push(ROUTE_DATA_MODEL_LIST)}
          />
        </Item>
      )
    }

    {renderAppMenuItems(intl, userPermissions)}

    {
        hasAccess(ROLE_SUPERUSER, userPermissions) && (
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
        )
      }

    { hasAccess(ROLE_SUPERUSER, userPermissions) && ComponentRepositoryMenuItem }
    <Item
      className="fixed-bottom"
      id="menu-configuration"
      title={intl.formatMessage({ id: 'menu.settings', defaultMessage: 'Settings' })}
      onClick={() => {}}
      iconClass="fa fa-cogs"
    >
      <SecondaryItem
        id="menu-categories"
        title={intl.formatMessage({ id: 'menu.categories', defaultMessage: 'Labels & Languages' })}
        onClick={() => history.push(ROUTE_CATEGORY_LIST)}
      />
      <SecondaryItem
        id="menu-labels-languages"
        title={intl.formatMessage({ id: 'menu.labelsAndLanguages', defaultMessage: 'Labels & Languages' })}
        onClick={() => history.push(ROUTE_LABELS_AND_LANGUAGES)}
      />
      <SecondaryItem
        id="menu-reload-configuration"
        title={intl.formatMessage({ id: 'menu.reloadConfiguration', defaultMessage: 'Reload Configuration' })}
        onClick={() => history.push(ROUTE_RELOAD_CONFIG)}
      />
      <SecondaryItem
        id="menu-databases"
        title={intl.formatMessage({ id: 'menu.database', defaultMessage: 'Database' })}
        onClick={() => history.push(ROUTE_DATABASE_LIST)}
      />
      <SecondaryItem
        id="menu-labels-file-browser"
        title={intl.formatMessage({ id: 'menu.fileBrowser', defaultMessage: 'File Browser' })}
        onClick={() => history.push(ROUTE_FILE_BROWSER)}
      />
      <SecondaryItem
        id="menu-data-types"
        title={intl.formatMessage({ id: 'menu.dataType', defaultMessage: 'Data Type' })}
        onClick={() => history.push(ROUTE_DATA_TYPE_LIST)}
      />
      <SecondaryItem
        id="menu-data-types"
        title={intl.formatMessage({ id: 'menu.dataType', defaultMessage: 'Data Type' })}
        onClick={() => history.push(ROUTE_DATA_TYPE_LIST)}
      />
    </Item>
  </VerticalNav>
);

LegacyAdminConsoleMenuBody.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

LegacyAdminConsoleMenuBody.defaultProps = {
  userPermissions: null,
};

export default withRouter(injectIntl(withPermissionValues(LegacyAdminConsoleMenuBody)));
