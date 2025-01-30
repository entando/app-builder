/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { withPermissionValues } from 'ui/auth/withPermissions';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import { routeConverter } from '@entando/utils';
import { Link } from 'react-router-dom';

const CardItem = ({
  title,
  code,
  subtitle,
  description,
  used,
  actions,
  route,
}) => (
  <div className="CardItem">
    {actions && <div className="CardItemActions">{actions}</div>}
    <div className="CardItemIconWrapper">
      <WidgetIcon widgetId={code} />
    </div>
    <div>
      <div className="CardItemLabel">
        {route ?
          <Link className="CardItemTitle" to={routeConverter(route.url, { [route.type]: code })}>
            {title}
          </Link> :
          <div className="CardItemTitle">
            {title}
          </div >
        }
        {used &&
          <OverlayTrigger
            placement="top"
            trigger={['click']}
            rootClose
            overlay={
              <Popover className="CardItemCounter__popover">
                <FormattedMessage id="app.used" />
              </Popover>
            }
          >
            <div className="CardItemCounter">{used}</div>
          </OverlayTrigger>
        }
      </div>
      <div className="CardItemSubtitle">{subtitle}</div>
      {description && <div className="CardItemDescription">{description}</div>}
    </div>
  </div>
);

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  used: PropTypes.number,
  actions: PropTypes.func,
  route: PropTypes.shape({
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default withPermissionValues(CardItem);
