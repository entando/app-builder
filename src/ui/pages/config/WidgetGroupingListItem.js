import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import { ROUTE_WIDGET_EDIT } from 'app-init/router';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';

const WidgetGroupingListItem = ({ widgetId, widgetName, connectDragSource }) => {
  const component = (
    <div className="WidgetGroupingListItem">
      <div className="WidgetGroupingListItem__wrapper">
        <div className="WidgetGroupingListItem__icon">
          <WidgetIcon widgetId={widgetId} />
        </div>
      </div>
      <div className="WidgetGroupingListItem__description">
        <Link
          to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: widgetId })}
        >
          {widgetName}
        </Link>
      </div>
    </div>
  );
  if (connectDragSource) {
    return connectDragSource(component);
  }
  return component;
};

WidgetGroupingListItem.propTypes = {

  widgetName: PropTypes.string.isRequired,

  /* eslint-disable react/no-unused-prop-types */
  widgetId: PropTypes.string, // needed when it's draggable
  /* eslint-enable react/no-unused-prop-types */

  // react-dnd
  connectDragSource: PropTypes.func,
};

WidgetGroupingListItem.defaultProps = {
  widgetId: null,
  connectDragSource: null,
};

export default WidgetGroupingListItem;
