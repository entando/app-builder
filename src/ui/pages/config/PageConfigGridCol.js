import React from 'react';
import PropTypes from 'prop-types';

import PageConfigGridRow from 'ui/pages/config/PageConfigGridRow';
import DroppableEmptyFrame from 'ui/pages/config/DroppableEmptyFrame';
import DraggableWidgetFrame from 'ui/pages/config/DraggableWidgetFrame';

export const ROW_HEIGHT = 80;

const PageConfigGridCol = ({ col, gridWidth, pageWidgets }) => {
  const width = (col.x2 - col.x1) + 1;
  const height = (col.y2 - col.y1) + 1;
  const pcWidth = ((width / gridWidth) * 100);

  const pageWidget = col.frame && pageWidgets[col.frame.pos];

  const classNameAr = ['PageConfigGridCol'];
  let content;
  if (col.rows) {
    classNameAr.push('PageConfigGridCol--container');
    content = col.rows.map(row => (
      <PageConfigGridRow
        key={`row-${row.y1}`}
        row={row}
        parentBsWidth={width}
        pageWidgets={pageWidgets}
      />
    ));
  } else if (!col.frame) {
    classNameAr.push('PageConfigGridCol--hole');
    content = null;
  } else if (pageWidget) {
    classNameAr.push('PageConfigGridCol--frame');
    content = (
      <DraggableWidgetFrame
        frame={col.frame}
        widget={{
          code: pageWidget.type,
          name: pageWidget.type,
        }}
      />
    );
  } else {
    classNameAr.push('PageConfigGridCol--frame');
    content = <DroppableEmptyFrame frame={col.frame} />;
  }

  return (
    <div
      key={`col-${col.x1}`}
      style={{ minHeight: ROW_HEIGHT * height, width: `${pcWidth}%` }}
      className={classNameAr.join(' ')}
    >
      { content }
    </div>
  );
};


// PropTypes
const COL_TYPE = PropTypes.shape({
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  frame: PropTypes.shape({
    descr: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
  }),
});

PageConfigGridCol.propTypes = {
  col: COL_TYPE.isRequired,
  gridWidth: PropTypes.number,
  pageWidgets: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
  })),
};

PageConfigGridCol.defaultProps = {
  gridWidth: 12,
  pageWidgets: [],
};

export default PageConfigGridCol;
