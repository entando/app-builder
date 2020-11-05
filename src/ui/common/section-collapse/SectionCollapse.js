import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import DraggableContentWidgetElement from 'ui/pages/config/DraggableContentWidgetElement';

import SectionCollapseTitle from 'ui/common/section-collapse/SectionCollapseTitle';

const SectionCollapse = ({
  widgets, name, opened, locale,
}) => {
  const [sectionOpened, setSectionOpened] = useState(opened);
  const handleTitleClicked = () => setSectionOpened(!sectionOpened);
  const itemAreaClassNames = ['SectionCollapse__item-area'];
  if (widgets.length % 2 === 1) {
    itemAreaClassNames.push('odd');
  }

  return (
    <div className="SectionCollapse">
      <SectionCollapseTitle
        name={<FormattedMessage id={`widget.list.section.${name}`} defaultMessage={name} />}
        isOpened={sectionOpened}
        onClick={handleTitleClicked}
      />
      <Collapse in={sectionOpened}>
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

SectionCollapse.propTypes = {
  widgets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  opened: PropTypes.bool,
};

SectionCollapse.defaultProps = {
  opened: false,
};

export default SectionCollapse;
