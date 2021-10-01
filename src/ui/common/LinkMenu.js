import React, { Fragment } from 'react';
import { LinkMenuItem } from '@entando/menu';
import { hasAccess } from '@entando/utils';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  ROUTE_CMS_CONTENTTEMPLATE_LIST, ROUTE_CMS_CONTENTTYPE_LIST,
  ROUTE_CMS_CONTENTS, ROUTE_CMS_ASSETS_LIST, ROUTE_CMS_VERSIONING,
  ROUTE_CATEGORIES,
} from 'app-init/router';
import { adminConsoleUrl } from 'helpers/urlUtils';
import { withPermissionValues } from 'ui/auth/withPermissions';

import {
  CRUD_CONTENTS_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
  MANAGE_CATEGORIES_PERMISSION,
} from 'state/permissions/const';

const LinkMenu = ({ userPermissions, isSuperuser }) => {
  const hasEditContentsAccess = hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions);

  const hasContentSupervisorAccess = hasEditContentsAccess
    || hasAccess(VALIDATE_CONTENTS_PERMISSION, userPermissions);
  const hasManageResourcesAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const hasContentTypesAccess = isSuperuser;
  const hasContentTemplatesAccess = isSuperuser;
  const hasContentSettingsAccess = isSuperuser;
  const hasCategoriesAccess = hasAccess(MANAGE_CATEGORIES_PERMISSION, userPermissions);
  const hasVersioningAccess = isSuperuser || hasEditContentsAccess || hasManageResourcesAccess;

  return (
    <Fragment>
      {
      hasContentSupervisorAccess && (
      <LinkMenuItem
        id="menu-contents"
        label={<FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />}
        to={ROUTE_CMS_CONTENTS}
      />
      )
      }
      {
        hasManageResourcesAccess && (
        <LinkMenuItem
          id="menu-assets"
          label={<FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />}
          to={ROUTE_CMS_ASSETS_LIST}
        />
        )
      }
      {
        hasContentTemplatesAccess && (
        <LinkMenuItem
          id="menu-content-template"
          label={<FormattedMessage id="cms.menu.contenttemplates" defaultMessage="Content Templates" />}
          to={ROUTE_CMS_CONTENTTEMPLATE_LIST}
        />
        )
      }
      {
        hasCategoriesAccess && (
          <LinkMenuItem
            id="menu-categories"
            label={<FormattedMessage id="cms.menu.categories" />}
            to={ROUTE_CATEGORIES}
          />
        )
      }
      {
        hasVersioningAccess && (
        <LinkMenuItem
          id="menu-versioning"
          label={<FormattedMessage id="cms.menu.versioning" defaultMessage="Content Versioning" />}
          to={ROUTE_CMS_VERSIONING}
        />
        )
      }
      {
        isSuperuser && (
          <li className="LinkMenuItem" data-id="menu-versioning">
            <a href={adminConsoleUrl('do/jpcontentscheduler/config/viewItem.action')}>
              <FormattedMessage id="cms.menu.scheduler" defaultMessage="Content Scheduler" />
            </a>
          </li>
        )
      }
      {
        hasContentTypesAccess && (
        <LinkMenuItem
          id="menu-content-type"
          label={<FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />}
          to={ROUTE_CMS_CONTENTTYPE_LIST}
        />
        )
      }
      {
        hasContentSettingsAccess && (
        <LinkMenuItem
          id="menu-content-settings"
          label={<FormattedMessage id="cms.menu.contentsettings" defaultMessage="Content Settings" />}
          to="/cms/content-settings"
        />
        )
      }
    </Fragment>
  );
};

LinkMenu.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  isSuperuser: PropTypes.bool.isRequired,
};

LinkMenu.defaultProps = {
  userPermissions: [],
};


export default withPermissionValues(LinkMenu);
