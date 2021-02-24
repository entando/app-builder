import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSelector } from 'react-redux';

import { getWidgetIcon } from 'state/widgets/selectors';
import { getResourcePath } from 'helpers/microfrontends';

// const imageProvider = `${process.env.DOMAIN}/resources/static/widget-icons`;
const imageProvider = getResourcePath('static/widget-icons');
const publicUrl = process.env.PUBLIC_URL;
const fallbackIcon = `${publicUrl}/images/puzzle-piece-solid.svg`;

const WidgetIcon = ({
  widgetId, small, icon, className,
}) => {
  const storeIcon = useSelector(getWidgetIcon(widgetId));
  const [iconType, iconName] = (icon || storeIcon || '').split(':');

  return iconType === 'font-awesome'
    ? <span className={cx('fa', iconName, 'WidgetIcon', small && 'WidgetIcon--small', className)} />
    : <img
      src={`${imageProvider}/${iconName}.svg`}
      alt={`icon ${iconName}`}
      className={cx('WidgetIcon', small && 'WidgetIcon--small', className)}
      onError={(e) => { e.target.onerror = null; e.target.src = fallbackIcon; }}
    />;
};

WidgetIcon.propTypes = {
  widgetId: PropTypes.string,
  small: PropTypes.bool,
  icon: PropTypes.string,
  className: PropTypes.string,
};

WidgetIcon.defaultProps = {
  widgetId: '',
  icon: '',
  small: false,
  className: null,
};

export default WidgetIcon;
