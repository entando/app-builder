import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import SectionCollapse from 'ui/common/section-collapse/SectionCollapse';

const renderComponent = widgetList => (
  Object.keys(widgetList).map((widget, idx) => (
    <SectionCollapse
      widgets={widgetList[widget]}
      opened={idx === 0}
    />
  ))
);

const msgs = defineMessages({
  search: {
    id: 'app.search',
    defaultMessage: 'Search',
  },
});

const ContentWidget = ({
  intl, widgetList, filterWidget, viewList,
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
  changeViewList: PropTypes.func,
  viewList: PropTypes.string,
};

ContentWidget.defaultProps = {
  widgetList: {},
  filterWidget: PropTypes.noop,
  changeViewList: PropTypes.noop,
  viewList: 'list',

};

export default injectIntl(ContentWidget);
