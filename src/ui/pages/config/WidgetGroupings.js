import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import WidgetGrouping from 'ui/pages/config/WidgetGrouping';

const msgs = defineMessages({
  search: {
    id: 'pages.designer.searchWidgetLabel',
    defaultMessage: 'Search',
  },
});

const WidgetGroupings = ({
  intl, groupedWidgets, widgetGroupingList, filterWidget, locale, searchFilter,
}) => {
  const onChange = (event) => {
    filterWidget(event.target.value);
  };

  const [openGroupings, setOpenGroupings] = useState();
  const toggleGroupingCollapse = grouping => setOpenGroupings({
    ...openGroupings,
    [grouping]: !openGroupings[grouping],
  });

  useEffect(() => {
    const newOpenGroupings = widgetGroupingList.reduce((acc, curr, idx) => ({
      ...acc,
      [curr]: !!searchFilter || idx === 0,
    }), {});
    setOpenGroupings(newOpenGroupings);
  }, [searchFilter, widgetGroupingList]);

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
        {
          widgetGroupingList.map(grouping => (
            <WidgetGrouping
              widgets={groupedWidgets[grouping]}
              locale={locale}
              onToggle={() => toggleGroupingCollapse(grouping)}
              opened={openGroupings[grouping]}
              name={grouping}
              key={grouping}
            />
          ))
        }
      </div>
    </div>
  );
};

WidgetGroupings.propTypes = {
  filterWidget: PropTypes.func,
  groupedWidgets: PropTypes.shape({}),
  widgetGroupingList: PropTypes.arrayOf(PropTypes.string),
  intl: intlShape.isRequired,
  searchFilter: PropTypes.string,
  locale: PropTypes.string,
};

WidgetGroupings.defaultProps = {
  groupedWidgets: {},
  widgetGroupingList: [],
  filterWidget: PropTypes.noop,
  searchFilter: null,
  locale: 'en',
};

export default injectIntl(WidgetGroupings);
