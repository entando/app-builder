import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DraggableContentWidgetElement from 'ui/pages/config/WidgetGroupingDraggableItem';

import SectionCollapseTitle from 'ui/common/section-collapse/SectionCollapseTitle';

const WidgetGrouping = ({
  widgets, name, opened, locale, onToggle,
}) => {
  const itemAreaClassNames = ['SectionCollapse__item-area'];
  if (widgets.length % 2 === 1) {
    itemAreaClassNames.push('odd');
  }

  return (
    <div className="SectionCollapse">
      <SectionCollapseTitle
        name={<FormattedMessage id={`widget.list.section.${name}`} defaultMessage={name} />}
        isOpened={opened}
        onClick={onToggle}
      />
      <Collapse in={opened}>
        <div>
          <div className={itemAreaClassNames.join(' ')}>
            {widgets.map(widget => (
              <DraggableContentWidgetElement
                key={`wdg-${widget.code}`}
                widgetName={widget.titles[locale]}
                widgetId={widget.code}
              />
            ))}
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
};

WidgetGrouping.defaultProps = {
  opened: false,
};

export default WidgetGrouping;
