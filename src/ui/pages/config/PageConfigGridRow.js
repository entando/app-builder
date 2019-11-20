import React from 'react';
import PropTypes from 'prop-types';

import PageConfigGridCol from 'ui/pages/config/PageConfigGridCol';


const PageConfigGridRow = ({ cellMap, cellKey, gridWidth }) => {
  const children = Object.keys(cellMap)
    .map(key => cellMap[key])
    .filter(cell => cell.parentKey === cellKey);

  const columns = children.map(col => (
    <PageConfigGridCol
      key={col.key}
      cellMap={cellMap}
      cellKey={col.key}
      gridWidth={gridWidth}
    />
  ));

  return (
    <div className="PageConfigGridRow">
      { columns }
    </div>
  );
};


PageConfigGridRow.propTypes = {
  cellMap: PropTypes.objectOf(PropTypes.shape({
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    frame: PropTypes.shape({
      descr: PropTypes.string.isRequired,
      pos: PropTypes.number.isRequired,
    }),
    widget: PropTypes.shape({
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      hasConfig: PropTypes.bool.isRequired,
    }),
  })).isRequired,
  cellKey: PropTypes.string.isRequired,
  gridWidth: PropTypes.number,
};

PageConfigGridRow.defaultProps = {
  gridWidth: 12,
};

export default PageConfigGridRow;
