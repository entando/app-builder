import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';

import ContentWidgetElement from 'ui/pages/config/ContentWidgetElement';


const renderWidgetCategory = title => (
  <div className="ContentWidgetElement__widget-spacer">
    <h2 className="
      panel-title
      ContentWidgetElement__widget-title"
    >  {title}
    </h2>
  </div>
);

const renderWidgetElement = (el, viewList) => (
  <ContentWidgetElement
    key={el.name}
    description={el.name}
    viewList={viewList}
  />
);

const renderComponent = (widgetList, viewList) =>
  Object.keys(widgetList).map(widget =>
    widgetList[widget].map((el, index) => {
      const element = [];
      if (index === 0) {
        element.push(renderWidgetCategory(el.widgetCategory));
      }
      element.push(renderWidgetElement(el, viewList));
      return element;
    }));


const ContentWidget = ({
  widgetList, filterWidget, changeViewList, viewList,
}) => {
  const onChange = (event) => {
    filterWidget(event.target.value);
  };

  return (

    <div className="ContentWidget">
      <div className="ContentWidget__right-menu-title">
        <FormattedMessage id="menu.widgets" />
        <span className="pull-right ContentWidget__drawer-pf-icons-right-menu">
          <i className="fa fa-th-large ContentWidget__pointer" aria-hidden="true" onClick={() => changeViewList('card')} />
          <i className="fa fa-th-list ContentWidget__pointer" aria-hidden="true" onClick={() => changeViewList('list')} />
        </span>
        <input
          className="ContentWidget__input-pf-right-menu"
          type="text"
          onChange={onChange}
          placeholder={formattedText('app.search')}
        />
      </div>
      <div className="
        list-group
        list-view-pf
        widget-list"
      >

        {renderComponent(widgetList, viewList)}
      </div>
    </div>
  );
};

ContentWidget.propTypes = {
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

export default ContentWidget;
