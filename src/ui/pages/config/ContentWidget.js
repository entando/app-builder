import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';

import ContentWidgetElement from 'ui/pages/config/ContentWidgetElement';


const renderComponent = widgetList =>
  Object.keys(widgetList).map(widget =>
    widgetList[widget].map((el, index) => {
      if (index === 0) {
        return (
          <ContentWidgetElement
            title={el.root}
            description={el.name}
          />);
      }

      return (
        <ContentWidgetElement
          description={el.name}
        />
      );
    }));

const ContentWidget = ({ widgetList, filterWidget }) => (

  <div className="ContentWidget">
    <div className="ContentWidget__right-menu-title">
      <FormattedMessage id="menu.widgets" />
      <span className="pull-right ContentWidget__drawer-pf-icons-right-menu">
        <i className="fa fa-th-large pointer" aria-hidden="true" />
        <i className="fa fa-th-list pointer" aria-hidden="true" />
      </span>
      <input
        className="ContentWidget__input-pf-right-menu"
        type="text"
        onChange={filterWidget}
        placeholder={formattedText('app.search')}
      />
    </div>

    {renderComponent(widgetList)}


  </div>
);

ContentWidget.propTypes = {
  widgetList: PropTypes.shape({}),
  filterWidget: PropTypes.func,
};

ContentWidget.defaultProps = {
  widgetList: {},
  filterWidget: PropTypes.noop,
};

export default ContentWidget;
