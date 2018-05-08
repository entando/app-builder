import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';

import DraggableContentWidgetElement from 'ui/pages/config/DraggableContentWidgetElement';


const renderWidgetCategory = title => (
  <div key={`cat-${title}`} className="ContentWidgetElement__widget-spacer">
    <h2 className="panel-title ContentWidgetElement__widget-title">
      {title}
    </h2>
  </div>
);

const renderWidgetElement = el => (
  <DraggableContentWidgetElement
    key={`wdg-${el.code}`}
    widgetName={el.name}
    widgetId={el.code}
  />
);

const renderComponent = widgetList =>
  Object.keys(widgetList).map(widget =>
    widgetList[widget].map((el, index) => {
      const element = [];
      if (index === 0) {
        element.push(renderWidgetCategory(el.typology));
      }
      element.push(renderWidgetElement(el));
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
          <i
            className="fa fa-th-large ContentWidget__pointer ContentWidget__view-mode-icon"
            role="button"
            tabIndex={-1}
            onKeyDown={() => changeViewList('card')}
            onClick={() => changeViewList('card')}
          />
          <i
            className="fa fa-th-list ContentWidget__pointer ContentWidget__view-mode-icon"
            role="button"
            tabIndex={-2}
            onKeyDown={() => changeViewList('list')}
            onClick={() => changeViewList('list')}
          />
        </span>
        <input
          className="ContentWidget__input-pf-right-menu"
          type="text"
          onChange={onChange}
          placeholder={formattedText('app.search')}
        />
      </div>
      <div className={`ContentWidgetList ContentWidgetList--${viewList}`}>
        {renderComponent(widgetList)}
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
