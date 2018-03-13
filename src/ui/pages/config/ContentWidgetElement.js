import React from 'react';
import PropTypes from 'prop-types';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';

import { Link } from 'frontend-common-components';

const ContentWidgetElement = ({ code, description }) => (

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
              params={{ widgetCode: code }}
            >
              {description}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ContentWidgetElement.propTypes = {
  code: PropTypes.string,
  description: PropTypes.string,
};

ContentWidgetElement.defaultProps = {
  code: null,
  description: null,
};

export default ContentWidgetElement;
