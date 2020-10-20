import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import SectionCollapse from 'ui/common/section-collapse/SectionCollapse';

const renderComponent = widgetList => (
  Object.keys(widgetList).map((widget, idx) => (
    <SectionCollapse
      widgets={widgetList[widget]}
      opened={idx === 0}
      key={widgetList[widget][0].pluginDesc || widgetList[widget][0].typology}
    />
  ))
);

const msgs = defineMessages({
  search: {
    id: 'pages.designer.searchWidgetLabel',
    defaultMessage: 'Search',
  },
});

const ContentWidget = ({
  intl, widgetList, filterWidget,
}) => {
  const onChange = (event) => {
    filterWidget(event.target.value);
  };
  return (

    <div className="ContentWidget">
      <div className="ContentWidget__right-menu-title">
        <input
          className="ContentWidget__input-pf-right-menu"
          type="text"
          onChange={onChange}
          placeholder={intl.formatMessage(msgs.search)}
        />
      </div>
      <div>
        {renderComponent(widgetList)}
      </div>
    </div>
  );
};

ContentWidget.propTypes = {
  intl: intlShape.isRequired,
  widgetList: PropTypes.shape({}),
  filterWidget: PropTypes.func,
};

ContentWidget.defaultProps = {
  widgetList: {},
  filterWidget: PropTypes.noop,
};

export default injectIntl(ContentWidget);
