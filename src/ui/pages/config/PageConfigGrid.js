import React from 'react';
import PropTypes from 'prop-types';


const renderGrid = (gridStruct, parentBsWidth) => {
  if (!gridStruct.rows) {
    return null;
  }
  return gridStruct.rows.map((row) => {
    const renderedCols = row.cols.map((col) => {
      const width = (col.x2 - col.x1) + 1;
      const height = (col.y2 - col.y1) + 1;
      const pcWidth = ((width / parentBsWidth) * 100);
      let className;
      if (col.rows) {
        className = 'PageConfigGrid__container';
      } else if (!col.frame) {
        className = 'PageConfigGrid__hole';
      } else {
        className = 'PageConfigGrid__slot';
      }

      return (
        <div
          key={`col-${col.x1}`}
          style={{ minHeight: 80 * height, width: `${pcWidth}%` }}
          className={className}
        >
          {col.rows ? renderGrid(col, width) : col.frame && col.frame.descr }
        </div>
      );
    });
    return (
      <div
        key={`row-${row.y1}`}
        className="PageConfigGrid__row"
      >
        {renderedCols}
      </div>
    );
  });
};

const PageConfigGrid = ({ pageModelStruct }) => (
  <div className="PageConfigGrid">
    { renderGrid(pageModelStruct, 12) }
  </div>
);


// PropTypes

const COORDS_SHAPE = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};

const lazy = f => (...args) => f().apply(this, args);

let ROW_TYPE;

const COL_TYPE = PropTypes.shape({
  ...COORDS_SHAPE,
  rows: PropTypes.arrayOf(lazy(() => ROW_TYPE)),
  frame: PropTypes.shape({
    descr: PropTypes.string.isRequired,
    sketch: PropTypes.shape(COORDS_SHAPE),
  }),
});

ROW_TYPE = PropTypes.shape({
  ...COORDS_SHAPE,
  cols: PropTypes.arrayOf(COL_TYPE).isRequired,
});

PageConfigGrid.propTypes = {
  pageModelStruct: COL_TYPE.isRequired,
};

export default PageConfigGrid;
