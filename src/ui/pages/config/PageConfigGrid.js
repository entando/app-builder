import React from 'react';
import PropTypes from 'prop-types';

const ROW_HEIGHT = 80;

let renderGrid;


const renderCols = (cols, parentBsWidth) =>
  cols.map((col) => {
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
        style={{ minHeight: ROW_HEIGHT * height, width: `${pcWidth}%` }}
        className={className}
      >
        {col.rows ? renderGrid(col, width) : col.frame && col.frame.descr }
      </div>
    );
  });


renderGrid = (gridStruct, parentBsWidth) => {
  if (!gridStruct.rows) {
    return null;
  }
  return gridStruct.rows.map(row => (
    <div
      key={`row-${row.y1}`}
      className="PageConfigGrid__row"
    >
      { renderCols(row.cols, parentBsWidth) }
    </div>
  ));
};

const PageConfigGrid = ({ pageModelStruct }) => (
  <div className="PageConfigGrid">
    { pageModelStruct && renderGrid(pageModelStruct, 12) }
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
  pageModelStruct: COL_TYPE,
};

PageConfigGrid.defaultProps = {
  pageModelStruct: null,
};

export default PageConfigGrid;
