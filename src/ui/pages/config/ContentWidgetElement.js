import React from 'react';
import PropTypes from 'prop-types';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

import { Link } from 'frontend-common-components';

const ContentWidgetElement = ({ widgetId, widgetName, connectDragSource }) => {
  const component = (
    <div className="ContentWidgetElement list-group-item">
      <div className="ContentWidgetElement__main list-view-pf-main-info">
        <div className="ContentWidgetElement__icon list-view-pf-left">
          <span className="
            fa fa-default
            fa-puzzle-piece
            list-view-pf-icon-sm
            ContentWidgetElement__widget-icon
            fa-banner-main-left"
          />
        </div>
        <div className="list-view-pf-body">
          <div className="list-view-pf-description">
            <div className="ContentWidgetElement__description">
              <Link
                route={ROUTE_WIDGET_EDIT}
                params={{ widgetCode: widgetId }}
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
