import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import SectionCollapse from 'ui/common/section-collapse/SectionCollapse';

const renderComponent = (groupedWidgets, widgetGroupingList, locale) => (
  widgetGroupingList.map((grouping, idx) => (
    <SectionCollapse
      widgets={groupedWidgets[grouping]}
      locale={locale}
      opened={idx === 0}
      name={grouping}
      key={grouping}
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
  intl, groupedWidgets, widgetGroupingList, filterWidget, locale,
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
        {renderComponent(groupedWidgets, widgetGroupingList, locale)}
      </div>
    </div>
  );
};

ContentWidget.propTypes = {
  filterWidget: PropTypes.func,
  groupedWidgets: PropTypes.shape({}),
  widgetGroupingList: PropTypes.arrayOf(PropTypes.string),
  intl: intlShape.isRequired,
  locale: PropTypes.string,
};

ContentWidget.defaultProps = {
  groupedWidgets: {},
  widgetGroupingList: [],
  filterWidget: PropTypes.noop,
  locale: 'en',
};

export default injectIntl(ContentWidget);
