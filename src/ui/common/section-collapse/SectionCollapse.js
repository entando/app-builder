import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import DraggableContentWidgetElement from 'ui/pages/config/DraggableContentWidgetElement';

import SectionCollapseTitle from 'ui/common/section-collapse/SectionCollapseTitle';

const SectionCollapse = ({ widgets, opened }) => {
  const [sectionOpened, setSectionOpened] = useState(opened);
  const handleTitleClicked = () => setSectionOpened(!sectionOpened);
  const itemAreaClassName = ['SectionCollapse__item-area'];
  if (widgets.length % 2 === 1) {
    itemAreaClassName.push('odd');
  }
  return (
    <div className="SectionCollapse">
      <SectionCollapseTitle
        name={widgets[0].pluginDesc || widgets[0].typology}
        isOpened={sectionOpened}
        onClick={handleTitleClicked}
      />
      <Collapse in={sectionOpened}>
        <div>
          <div className={itemAreaClassName.join(' ')}>
            {widgets.map(widget => (
              <DraggableContentWidgetElement
                key={`wdg-${widget.code}`}
                widgetName={widget.name}
                widgetId={widget.code}
              />
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

SectionCollapse.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  opened: PropTypes.bool,
};

SectionCollapse.defaultProps = {
  opened: false,
};

export default SectionCollapse;
