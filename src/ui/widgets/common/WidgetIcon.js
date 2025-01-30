import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { getWidgetIcon } from 'state/widgets/selectors';

const WidgetIcon = ({
  widgetId, small, icon, className,
}) => {
  const storeIcon = useSelector(getWidgetIcon(widgetId));
  const [iconType, iconName] = (icon || storeIcon || '').split(':');


  return iconType === 'font-awesome' ? (
    <span
      className={cx(
        'fa',
        iconName,
        'WidgetIcon',
        small && 'WidgetIcon--small',
        className,
      )}
    />
  ) : (
    <span
      className={cx(
      'fa',
      'fa-puzzle-piece',
      'WidgetIcon',
      small && 'WidgetIcon--small',
      className,
    )}
    />
  );
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
