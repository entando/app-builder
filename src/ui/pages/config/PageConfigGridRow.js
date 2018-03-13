import React from 'react';
import PropTypes from 'prop-types';

import PageConfigGridCol from 'ui/pages/config/PageConfigGridCol';


const PageConfigGridRow = ({ row, gridWidth, pageWidgets }) => {
  const columns = row.cols.map(col => (
    <PageConfigGridCol
      key={`col-${col.x1}`}
      col={col}
      gridWidth={gridWidth}
      pageWidgets={pageWidgets}
    />
  ));

  return (
    <div className="PageConfigGridRow">
      { columns }
    </div>
  );
};


// PropTypes

const COORDS_SHAPE = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
};


const COL_TYPE = PropTypes.shape({
  ...COORDS_SHAPE,
  frame: PropTypes.shape({
    descr: PropTypes.string.isRequired,
    sketch: PropTypes.shape(COORDS_SHAPE),
  }),
});


PageConfigGridRow.propTypes = {
  row: PropTypes.shape({
    ...COORDS_SHAPE,
    cols: PropTypes.arrayOf(COL_TYPE).isRequired,
  }).isRequired,
  gridWidth: PropTypes.number,
  pageWidgets: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
  })),
};

PageConfigGridRow.defaultProps = {
  gridWidth: 12,
  pageWidgets: [],
};

export default PageConfigGridRow;
