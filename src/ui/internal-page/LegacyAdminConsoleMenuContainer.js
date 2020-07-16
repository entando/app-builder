import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { VerticalNav } from 'patternfly-react';
import { routeConverter, hasAccess } from '@entando/utils';

import UserMenuContainer from 'ui/internal-page/UserMenuContainer';
import LanguageSelectContainer from 'ui/internal-page/LanguageSelectContainer';

import { appBuilderVersion } from 'helpers/versions';

import {
  ROUTE_PAGE_TREE, ROUTE_WIDGET_LIST, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_USER_LIST, ROUTE_GROUP_LIST,
  ROUTE_LABELS_AND_LANGUAGES, ROUTE_CATEGORY_LIST, ROUTE_PAGE_TEMPLATE_LIST,
  ROUTE_ROLE_LIST, ROUTE_RELOAD_CONFIG, ROUTE_DATABASE_LIST, ROUTE_FILE_BROWSER,
  ROUTE_USER_RESTRICTIONS, ROUTE_PAGE_SETTINGS, ROUTE_PROFILE_TYPE_LIST, ROUTE_ECR_COMPONENT_LIST,
  ROUTE_CMS_VERSIONING, ROUTE_DASHBOARD,
} from 'app-init/router';

import apps from 'entando-apps';

import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';
import {
  ROLE_SUPERUSER, MANAGE_PAGES_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION, CRUD_USERS_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION, CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION, MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

import { withPermissionValues } from 'ui/auth/withPermissions';
import InfoMenu from 'ui/internal-page/InfoMenu';

const {
  Masthead, Item, SecondaryItem, TertiaryItem, Brand,
} = VerticalNav;

const publicUrl = process.env.PUBLIC_URL;
const CMS_APP_ID = 'cms';

const ROUTE_CMS_CONTENTTEMPLATE_LIST = '/cms/content-templates';
const ROUTE_CMS_CONTENTTYPE_LIST = '/cms/content-types';
const ROUTE_CMS_CONTENTS = '/cms/contents';
const ROUTE_CMS_ASSETS_LIST = '/cms/assets';
const ROUTE_CMS_CONTENT_SETTINGS = '/cms/content-settings';

const renderCMSMenuItems = (userPermissions, intl, history) => {
  const hasMenuContentsAccess = hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions)
    || hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions);
  const hasMenuAssetsAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const hasMenuContentTypeAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  const hasMenuContentTemplatesAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  const hasMenuContentSettingsAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  return (
    <SecondaryItem
      id="apps-cms"
      key="cms"
      onClick={() => {}}
      iconClass="fa fa-file-text-o"
      title={intl.formatMessage({ id: 'cms.title' })}
    >
      {
      hasMenuContentsAccess && (
      <TertiaryItem
        id="menu-contents"
        title={intl.formatMessage({ id: 'cms.menu.contents', defaultMessage: 'Contents' })}
        onClick={() => history.push(ROUTE_CMS_CONTENTS)}
      />
      )
      }
      {
        hasMenuAssetsAccess && (
        <TertiaryItem
          id="menu-assets"
          title={intl.formatMessage({ id: 'cms.assets.title', defaultMessage: 'Digital Assets' })}
          onClick={() => history.push(ROUTE_CMS_ASSETS_LIST)}
        />
        )
      }
      {
        hasMenuContentTypeAccess && (
        <TertiaryItem
          id="menu-content-type"
          title={intl.formatMessage({ id: 'cms.menu.contenttypes', defaultMessage: 'Content Types' })}
          onClick={() => history.push(ROUTE_CMS_CONTENTTYPE_LIST)}
        />
        )
      }
      {
        hasMenuContentTemplatesAccess && (
        <TertiaryItem
          id="menu-content-template"
          title={intl.formatMessage({ id: 'cms.menu.contenttemplates', defaultMessage: 'Content Templates' })}
          onClick={() => history.push(ROUTE_CMS_CONTENTTEMPLATE_LIST)}
        />
        )
      }
      {
        hasMenuContentSettingsAccess && (
        <TertiaryItem
          id="menu-content-settings"
          title={intl.formatMessage({ id: 'cms.menu.contentsettings', defaultMessage: 'Content Settings' })}
          onClick={() => history.push(ROUTE_CMS_CONTENT_SETTINGS)}
        />
        )
      }
    </SecondaryItem>
  );
};

const renderAppMenuItems = (intl, history, userPermissions) => Object.values(apps).map((App) => {
  let render = true;
  const isCMS = App.id === CMS_APP_ID;
  if (isCMS) {
    if (
      !hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions) &&
      !hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions) &&
      !hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions)) {
      render = false;
    }
  }
  return render && (isCMS ? renderCMSMenuItems(userPermissions, intl, history) : null);
});

const { COMPONENT_REPOSITORY_UI_ENABLED } = process.env;

const renderComponentRepositoryMenuItem = (history, intl) => (
  COMPONENT_REPOSITORY_UI_ENABLED ? (<Item
    id="component-repository"
    onClick={() => history.push(ROUTE_ECR_COMPONENT_LIST)}
    iconClass="fa fa-cart-plus"
    title={intl.formatMessage({ id: 'componentRepository.menuButton.title' })}
  />) : '');

const adminConsoleUrl = url => `${process.env.DOMAIN}/${url}`;

const LegacyAdminConsoleMenuBody = ({ userPermissions, intl, history }) => (
  <div>
    <VerticalNav
      blurDelay={700}
      blurDisabled={false}
      dynamicBodyClasses
      forceHidden={false}
      hiddenIcons={false}
      hideMasthead={false}
      hoverDelay={500}
      hoverDisabled={false}
      onNavigate={e => e.onClick()}
      pinnableMenus
      persistentSecondary={false}
    >
      <Masthead>
        <Brand
          href={ROUTE_DASHBOARD}
          iconImg={`${publicUrl}/images/entando-logo-white.svg`}
          img=""
          onClick={null}
          title={`App Builder ${appBuilderVersion}`}
        />
        <VerticalNav.IconBar collapse>
          <LanguageSelectContainer key="LanguageSelect" />
          <HomePageLinkContainer key="projectLink" />
          <InfoMenu key="InfoMenu" />
          <UserMenuContainer key="UserMenu" />
        </VerticalNav.IconBar>
      </Masthead>
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
          title={intl.formatMessage({ id: 'menu.uxComponents', defaultMessage: 'UX Pattern' })}
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
      hasAccess(ROLE_SUPERUSER, userPermissions)
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
              title={intl.formatMessage({ id: 'menu.mail', defaultMessage: 'Email Configuration' })}
              onClick={() => {}}
              href={adminConsoleUrl('do/jpmail/MailConfig/editSmtp.action')}
            />
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.scheduler', defaultMessage: 'Content Scheduler' })}
              onClick={() => {}}
              href={adminConsoleUrl('do/jpcontentscheduler/config/viewItem.action')}
            />
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
              title={intl.formatMessage({ id: 'menu.apiManagement.resources', defaultMessage: 'Resources' })}
              onClick={() => {}}
              href={adminConsoleUrl('do/Api/Resource/list.action')}
            />
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.apiManagement.services', defaultMessage: 'Services' })}
              onClick={() => {}}
              href={adminConsoleUrl('do/Api/Service/list.action')}
            />
            <TertiaryItem
              title={intl.formatMessage({ id: 'menu.apiManagement.consumers', defaultMessage: 'Consumers' })}
              onClick={() => {}}
              href={adminConsoleUrl('do/Api/Consumer/list.action')}
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
          title={intl.formatMessage({ id: 'menu.userSettings', defaultMessage: 'User Settings' })}
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
      <Item
        id="menu-apps"
        iconClass="fa fa-rocket"
        title={intl.formatMessage({ id: 'menu.apps', defaultMessage: 'APPS' })}
        onClick={() => {}}
      >
        {renderAppMenuItems(intl, history, userPermissions)}
      </Item>

      { hasAccess(ROLE_SUPERUSER, userPermissions) &&
    renderComponentRepositoryMenuItem(history, intl) }
      {
      hasAccess(ROLE_SUPERUSER, userPermissions) && (
        <Item
          className="LegacyAdminConsoleMenu__fixed-bottom"
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
            id="menu-groups"
            title={intl.formatMessage({ id: 'menu.groups', defaultMessage: 'Groups' })}
            onClick={() => history.push(ROUTE_GROUP_LIST)}
          />
        </Item>
      )
    }
    </VerticalNav>
  </div>
);

LegacyAdminConsoleMenuBody.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({}).isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

LegacyAdminConsoleMenuBody.defaultProps = {
  userPermissions: null,
};

export default withPermissionValues(injectIntl(withRouter(LegacyAdminConsoleMenuBody)));
