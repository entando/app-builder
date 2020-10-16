import React from 'react';
import PropTypes from 'prop-types';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

const widgetIcons = {
  default: 'fa-cube',
  content_viewer: 'fa-file',
  row_content_viewer_list: 'fa-list-alt',
  NWS_Archive: 'fa-archive',
  NWS_Latest: 'fa-newspaper',
  content_viewer_list: 'fa-search',
  search_form: 'fa-search',
  search_result: 'fa-search',
  breadcrumbs: 'fa-cube',
  'navigation-menu': 'fa-bars',
  sitemap: 'fa-sitemap',
  language: 'fa-language',
  userprofile_editCurrentUser: 'fa-user',
  userprofile_editCurrentUser_password: 'fa-key',
  userprofile_editCurrentUser_profile: 'fa-address-card',
  'keycloak-login': 'fa-sign-in',
  login_form: 'fa-sign-in',
  entando_apis: 'fa-cube',
  formAction: 'fa-wrench',
  messages_system: 'fa-envelope-square',
  jpseo_content_viewer: 'fa-file',
};

const ContentWidgetElement = ({ widgetId, widgetName, connectDragSource }) => {
  const widgetIcon = widgetIcons[widgetId] || widgetIcons.default;

  const component = (
    <div className="ContentWidgetElement list-group-item">
      <div className="ContentWidgetElement__main list-view-pf-main-info">
        <div className="ContentWidgetElement__icon list-view-pf-left">
          <span className={`
            fa fa-default
            ${widgetIcon}
            ContentWidgetElement__widget-icon
            fa-banner-main-left`}
          />
        </div>
        <div className="list-view-pf-body">
          <div className="list-view-pf-description">
            <div className="ContentWidgetElement__description">
              <Link
                to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: widgetId })}
              >
                {widgetName}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  if (connectDragSource) {
    return connectDragSource(component);
  }
  return component;
};

ContentWidgetElement.propTypes = {

  widgetName: PropTypes.string.isRequired,

  /* eslint-disable react/no-unused-prop-types */
  widgetId: PropTypes.string, // needed when it's draggable
  /* eslint-enable react/no-unused-prop-types */

  // react-dnd
  connectDragSource: PropTypes.func,
};

ContentWidgetElement.defaultProps = {
  widgetId: null,
  connectDragSource: null,
};

export default ContentWidgetElement;
