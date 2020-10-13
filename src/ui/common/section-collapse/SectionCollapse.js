import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import DraggableContentWidgetElement from 'ui/pages/config/DraggableContentWidgetElement';

import SectionCollapseTitle from 'ui/common/section-collapse/SectionCollapseTitle';

const SectionCollapse = ({ widgets, opened }) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const handleTitleClicked = () => setSectionOpened(!sectionOpened);
  console.log(widgets);
  return (
    <div>
      <SectionCollapseTitle
        name={widgets[0].pluginDesc || widgets[0].typology}
        isOpened={sectionOpened}
        onClick={handleTitleClicked}
      />
      <Collapse in={sectionOpened}>
        <div>
          <div className="SectionCollapse__item-area">
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
