import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { VerticalNav } from 'patternfly-react';
import { routeConverter, hasAccess } from '@entando/utils';

import { clearAppTourProgress, setAppTourLastStep, setWizardEnabled } from 'state/app-tour/actions';

import UserMenuContainer from 'ui/internal-page/UserMenuContainer';
import LanguageSelectContainer from 'ui/internal-page/LanguageSelectContainer';

import {
  ROUTE_PAGE_TREE, ROUTE_FRAGMENT_LIST,
  ROUTE_PAGE_CONFIG, ROUTE_LABELS_AND_LANGUAGES, ROUTE_PAGE_TEMPLATE_LIST,
  ROUTE_RELOAD_CONFIG, ROUTE_DATABASE_LIST, ROUTE_FILE_BROWSER,
  ROUTE_PAGE_SETTINGS, ROUTE_ECR_COMPONENT_LIST,
  ROUTE_DASHBOARD, ROUTE_CATEGORY_LIST, ROUTE_CMS_VERSIONING, ROUTE_USER_LIST, ROUTE_ROLE_LIST,
  ROUTE_GROUP_LIST, ROUTE_PROFILE_TYPE_LIST, ROUTE_USER_RESTRICTIONS, ROUTE_WIDGET_LIST,
} from 'app-init/router';

import apps from 'entando-apps';

import HomePageLinkContainer from 'ui/internal-page/HomePageLinkContainer';
import {
  ROLE_SUPERUSER, MANAGE_PAGES_PERMISSION,
  EDIT_USER_PROFILES_PERMISSION, CRUD_USERS_PERMISSION,
  VIEW_USERS_AND_PROFILES_PERMISSION, CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION, MANAGE_RESOURCES_PERMISSION,
  MANAGE_CATEGORIES_PERMISSION,
} from 'state/permissions/const';

import { withPermissionValues } from 'ui/auth/withPermissions';
import InfoMenu from 'ui/internal-page/InfoMenu';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

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

const { DOMAIN } = getRuntimeEnv();

const adminConsoleUrl = url => `${DOMAIN}/${url}`;

const isCmsInstalled = apps.some((app => app.id === CMS_APP_ID));

const renderCmsMenuItems = (intl, history, userPermissions) => {
  const hasMenuContentsAccess = hasAccess([
    CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION], userPermissions);
  const hasMenuAssetsAccess = hasAccess(
    [MANAGE_RESOURCES_PERMISSION, CRUD_CONTENTS_PERMISSION, VALIDATE_CONTENTS_PERMISSION],
    userPermissions,
  );
  const hasMenuContentTypeAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  const hasMenuContentTemplatesAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  const hasCategoriesAccess = hasAccess(MANAGE_CATEGORIES_PERMISSION, userPermissions);
  const hasSchedulerAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  const hasMenuContentSettingsAccess = hasAccess(ROLE_SUPERUSER, userPermissions);
  return (
    <Item
      id="apps-cms"
      key="cms"
      onClick={() => {}}
      iconClass="fa fa-file-text-o"
      title={intl.formatMessage({ id: 'menu.cms' })}
    >
      {
      hasMenuContentsAccess && (
      <SecondaryItem
        id="menu-contents"
        title={intl.formatMessage({ id: 'cms.menu.contents', defaultMessage: 'Management' })}
        onClick={() => history.push(ROUTE_CMS_CONTENTS)}
      />
      )
      }
      {
        hasMenuAssetsAccess && (
        <SecondaryItem
          id="menu-assets"
          title={intl.formatMessage({ id: 'cms.assets.title', defaultMessage: 'Assets' })}
          onClick={() => history.push(ROUTE_CMS_ASSETS_LIST)}
        />
        )
      }
      {
        hasMenuContentTemplatesAccess && (
        <SecondaryItem
          id="menu-content-template"
          title={intl.formatMessage({ id: 'cms.menu.contenttemplates', defaultMessage: 'Templates' })}
          onClick={() => history.push(ROUTE_CMS_CONTENTTEMPLATE_LIST)}
        />
        )
      }
      {
        hasCategoriesAccess && (
        <SecondaryItem
          title={intl.formatMessage({ id: 'menu.categories', defaultMessage: 'Categories' })}
          onClick={() => history.push(ROUTE_CATEGORY_LIST)}
        />
        )
      }
      {
        hasAccess(ROLE_SUPERUSER, userPermissions) && (
        <SecondaryItem
          title={intl.formatMessage({ id: 'menu.versioning', defaultMessage: 'Versioning' })}
          onClick={() => history.push(ROUTE_CMS_VERSIONING)}
        />
        )
      }
      {
        hasSchedulerAccess && (
          <SecondaryItem
            title={intl.formatMessage({ id: 'menu.scheduler', defaultMessage: 'Scheduler' })}
            onClick={() => {}}
            href={adminConsoleUrl('do/jpcontentscheduler/config/viewItem.action')}
          />
        )
      }
      {
        hasMenuContentTypeAccess && (
        <SecondaryItem
          id="menu-content-type"
          title={intl.formatMessage({ id: 'cms.menu.contenttypes', defaultMessage: 'Types' })}
          onClick={() => history.push(ROUTE_CMS_CONTENTTYPE_LIST)}
        />
        )
      }
      {
        hasMenuContentSettingsAccess && (
        <TertiaryItem
          id="menu-content-settings"
          title={intl.formatMessage({ id: 'cms.menu.contentsettings', defaultMessage: 'Settings' })}
          onClick={() => history.push(ROUTE_CMS_CONTENT_SETTINGS)}
        />
        )
      }
    </Item>
  );
};

const { COMPONENT_REPOSITORY_UI_ENABLED } = getRuntimeEnv();

const renderComponentRepositoryMenuItem = (history, intl) => (
  COMPONENT_REPOSITORY_UI_ENABLED ? (<Item
    id="component-repository"
    onClick={() => history.push(ROUTE_ECR_COMPONENT_LIST)}
    iconClass="fa fa-cart-plus"
    title={intl.formatMessage({ id: 'componentRepository.menuButton.title' })}
  />) : '');

const LegacyAdminConsoleMenuBody = ({
  userPermissions, intl, history, onNextStep, onStartTutorial,
}) => (
  <div className="safari-menu-fix">
    <VerticalNav
      blurDisabled
      dynamicBodyClasses
      forceHidden={false}
      hiddenIcons={false}
      hideMasthead={false}
      hoverDelay={500}
      hoverDisabled={false}
      onNavigate={e => e.onClick()}
      pinnableMenus
    >
      <Masthead>
        <Brand
          href={`${publicUrl}${ROUTE_DASHBOARD}`}
          iconImg={`${publicUrl}/images/entando-logo-white.svg`}
          img=""
          onClick={null}
        />
        <VerticalNav.IconBar collapse>
          <LanguageSelectContainer key="LanguageSelect" />
          <HomePageLinkContainer key="projectLink" />
          <InfoMenu key="InfoMenu" onStartTutorial={onStartTutorial} />
          <UserMenuContainer key="UserMenu" />
        </VerticalNav.IconBar>
      </Masthead>
      <Item
        id="menu-dashboard"
        onClick={() => history.push(ROUTE_DASHBOARD)}
        iconClass="fa fa-window-maximize"
        title={intl.formatMessage({ id: 'menu.dashboard', defaultMessage: 'Dashboard' })}
      />
      {
      hasAccess(MANAGE_PAGES_PERMISSION, userPermissions) && (
        <Item
          id="menu-page-creator"
          className="app-tour-step-3"
          onClick={() => onNextStep(4)}
          iconClass="fa fa-files-o"
          title={intl.formatMessage({ id: 'menu.pageDesigner', defaultMessage: 'Pages' })}
        >
          <SecondaryItem
            id="menu-page-tree"
            title={intl.formatMessage({ id: 'menu.pageTree', defaultMessage: 'Management' })}
            className="app-tour-step-4"
            onClick={() => {
              onNextStep(5);
              history.push(ROUTE_PAGE_TREE);
            }}
          />
          <SecondaryItem
            id="menu-page-config"
            title={intl.formatMessage({ id: 'menu.pageConfig', defaultMessage: 'Designer' })}
            onClick={() => history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: 'homepage' }))}
          />
          {
            hasAccess(ROLE_SUPERUSER, userPermissions) && (
              <SecondaryItem
                id="menu-ux-pattern-page-templates"
                title={intl.formatMessage({ id: 'menu.pageTemplates', defaultMessage: 'Templates' })}
                onClick={() => history.push(ROUTE_PAGE_TEMPLATE_LIST)}
              />
            )
          }
          {
            hasAccess(ROLE_SUPERUSER, userPermissions) && (
              <SecondaryItem
                id="menu-page-settings"
                title={intl.formatMessage({ id: 'menu.pageSettings', defaultMessage: 'Settings' })}
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
          title={intl.formatMessage({ id: 'menu.uxComponents', defaultMessage: 'Components' })}
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
        </Item>
      )
    }
      {
        isCmsInstalled &&
        hasAccess([
          CRUD_CONTENTS_PERMISSION,
          MANAGE_RESOURCES_PERMISSION,
          VALIDATE_CONTENTS_PERMISSION,
        ], userPermissions) &&
        renderCmsMenuItems(intl, history, userPermissions)
      }
      {

        hasAccess(
          [
            VIEW_USERS_AND_PROFILES_PERMISSION,
            CRUD_USERS_PERMISSION,
            EDIT_USER_PROFILES_PERMISSION,
          ]
          , userPermissions,
        )
       && (
       <Item
         id="menu-user-settings"
         onClick={() => {}}
         iconClass="fa fa-users"
         title={intl.formatMessage({ id: 'menu.userSettings', defaultMessage: 'Users' })}
       >
         <SecondaryItem
           id="menu-users"
           title={intl.formatMessage({ id: 'menu.users', defaultMessage: 'Management' })}
           onClick={() => history.push(ROUTE_USER_LIST)}
         />
         {hasAccess(ROLE_SUPERUSER, userPermissions) && (
         <SecondaryItem
           id="menu-roles"
           title={intl.formatMessage({ id: 'menu.roles', defaultMessage: 'Roles' })}
           onClick={() => history.push(ROUTE_ROLE_LIST)}
         />
          )}
         {hasAccess(ROLE_SUPERUSER, userPermissions) && (
         <SecondaryItem
           id="menu-groups"
           title={intl.formatMessage({ id: 'menu.groups', defaultMessage: 'Groups' })}
           onClick={() => history.push(ROUTE_GROUP_LIST)}
         />
          )}
         {hasAccess(ROLE_SUPERUSER, userPermissions) && (
         <SecondaryItem
           id="menu-profile"
           title={intl.formatMessage({ id: 'menu.profileTypes', defaultMessage: 'Profile Types' })}
           onClick={() => history.push(ROUTE_PROFILE_TYPE_LIST)}
         />
          )}
         {hasAccess(ROLE_SUPERUSER, userPermissions) && (
         <SecondaryItem
           id="menu-user-restrictions"
           title={intl.formatMessage({ id: 'menu.users.restrictions', defaultMessage: 'Restrictions' })}
           onClick={() => history.push(ROUTE_USER_RESTRICTIONS)}
         />
          )}
       </Item>
      )
      }

      { hasAccess(ROLE_SUPERUSER, userPermissions) &&
    renderComponentRepositoryMenuItem(history, intl) }
      {
      hasAccess(ROLE_SUPERUSER, userPermissions) && (
        <Item
          className="LegacyAdminConsoleMenu__fixed-bottom"
          id="menu-configuration"
          title={intl.formatMessage({ id: 'menu.settings', defaultMessage: 'Administration' })}
          onClick={() => {}}
          iconClass="fa fa-cogs"
        >
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
            id="menu-labels-languages"
            title={intl.formatMessage({ id: 'menu.labelsAndLanguages', defaultMessage: 'Languages & Labels' })}
            onClick={() => history.push(ROUTE_LABELS_AND_LANGUAGES)}
          />
          <SecondaryItem
            id="menu-email"
            title={intl.formatMessage({ id: 'menu.mail', defaultMessage: 'Email Configuration' })}
            onClick={() => {}}
            href={adminConsoleUrl('do/jpmail/MailConfig/editSmtp.action')}
          />
          <SecondaryItem
            id="menu-reload-configuration"
            title={intl.formatMessage({ id: 'menu.reloadConfiguration', defaultMessage: 'Reload configuration' })}
            onClick={() => history.push(ROUTE_RELOAD_CONFIG)}
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
  onNextStep: PropTypes.func.isRequired,
  onStartTutorial: PropTypes.func.isRequired,
};

LegacyAdminConsoleMenuBody.defaultProps = {
  userPermissions: null,
};

const mapDispatchToProps = (dispatch, { history }) => ({
  onNextStep: nextStep => dispatch(setAppTourLastStep(nextStep)),
  onStartTutorial: () => {
    history.push(ROUTE_DASHBOARD);
    dispatch(clearAppTourProgress());
    dispatch(setWizardEnabled(true));
    dispatch(setAppTourLastStep(1));
  },
});

const LegacyAdminConsoleMenuContainer =
connect(null, mapDispatchToProps)(LegacyAdminConsoleMenuBody);

export default withPermissionValues(injectIntl(withRouter(LegacyAdminConsoleMenuContainer)));
