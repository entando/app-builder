import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DraggableContentWidgetGridElement from 'ui/pages/config/WidgetGroupingDraggableItem';
import DraggableContentWidgetListElement from 'ui/pages/config/WidgetGroupingDraggableListItem';
import CollapsibleSectionTitle from 'ui/common/CollapsibleSectionTitle';

import { GRID_VIEW } from 'ui/pages/config/WidgetGroupings';

const WidgetGrouping = ({
  widgets, name, opened, locale, onToggle, view,
}) => {
  const itemAreaClassNames = ['WidgetGrouping__item-area'];
  if (widgets.length % 2 === 1) {
    itemAreaClassNames.push('odd');
  }

  return (
    <div className="WidgetGrouping">
      <CollapsibleSectionTitle
        name={<FormattedMessage id={`widget.list.section.${name}`} defaultMessage={name} />}
        isOpened={opened}
        onClick={onToggle}
      />
      <Collapse in={opened}>
        <div>
          <div className={itemAreaClassNames.join(' ')}>
            {widgets.map(widget => (view === GRID_VIEW ? (
              <DraggableContentWidgetGridElement
                key={`wdg-${widget.code}`}
                widgetName={widget.titles[locale]}
                widgetId={widget.code}
              />
            ) : (
              <DraggableContentWidgetListElement
                key={`wdg-${widget.code}`}
                widgetName={widget.titles[locale]}
                widgetId={widget.code}
              />
            )))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

WidgetGrouping.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  opened: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

WidgetGrouping.defaultProps = {
  opened: false,
};

export default WidgetGrouping;
