import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import WidgetGrouping from 'ui/pages/config/WidgetGrouping';

export const GRID_VIEW = 'grid';
export const LIST_VIEW = 'list';

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

  const [openGroupings, setOpenGroupings] = useState({});
  const [view, setView] = useState(GRID_VIEW);
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

  const optClassSel = 'WidgetGroupings__view-option--selected';
  const gridViewClass = `fa fa-th WidgetGroupings__view-option ${
    view === GRID_VIEW ? optClassSel : ''
  }`;
  const listViewClass = `fa fa-list WidgetGroupings__view-option ${
    view === LIST_VIEW ? optClassSel : ''
  }`;

  const setGridView = () => setView(GRID_VIEW);
  const setListView = () => setView(LIST_VIEW);

  return (
    <div className="WidgetGroupings">
      <div className="WidgetGroupings__right-menu-title">
        <input
          className="WidgetGroupings__input-pf-right-menu"
          type="text"
          onChange={onChange}
          placeholder={intl.formatMessage(msgs.search)}
        />
        <div className="WidgetGroupings__view-options">
          <span
            className={gridViewClass}
            onClick={setGridView}
            onKeyDown={setGridView}
            role="button"
            tabIndex={-1}
          />
          <span
            className={listViewClass}
            onClick={setListView}
            onKeyDown={setListView}
            role="button"
            tabIndex={-2}
          />
        </div>
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
              view={view}
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
