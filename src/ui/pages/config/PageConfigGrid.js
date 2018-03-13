import React from 'react';
import PropTypes from 'prop-types';

import PageConfigGridCol from 'ui/pages/config/PageConfigGridCol';


const PageConfigGrid = ({ pageModelStruct, pageWidgets }) => {
  const content = pageModelStruct ?
    <PageConfigGridCol col={pageModelStruct} pageWidgets={pageWidgets} /> :
    null;

  return (
    <div className="PageConfigGrid">
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


PageConfigGrid.propTypes = {
  pageModelStruct: COL_TYPE,
  pageWidgets: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
  })),
};

PageConfigGrid.defaultProps = {
  pageModelStruct: null,
  pageWidgets: [],
};

export default PageConfigGrid;
