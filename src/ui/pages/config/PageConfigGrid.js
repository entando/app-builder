import React from 'react';
import PropTypes from 'prop-types';

import PageConfigGridCol from 'ui/pages/config/PageConfigGridCol';


const PageConfigGrid = ({ cellMap }) => {
  let content = null;

  if (cellMap) {
    const rootKey = Object.keys(cellMap).find(key => key.match(/^root/));
    if (!rootKey) {
      throw new Error('Root key not found in cell map');
    }
    content = <PageConfigGridCol cellMap={cellMap} cellKey={rootKey} />;
  }

  return (
    <div className="PageConfigGrid">
      { content }
    </div>
  );
};


PageConfigGrid.propTypes = {
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
    }),
  })),
};

PageConfigGrid.defaultProps = {
  cellMap: null,
};

export default PageConfigGrid;
