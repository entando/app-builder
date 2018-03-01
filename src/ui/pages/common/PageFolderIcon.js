import React from 'react';
import PropTypes from 'prop-types';


const PageFolderIcon = ({ empty }) => (
  (empty) ?
    <i className="fa fa-folder-o PageFolderIcon" /> :
    <i className="fa fa-folder PageFolderIcon" />
);

PageFolderIcon.propTypes = {
  empty: PropTypes.bool,
};

PageFolderIcon.defaultProps = {
  empty: false,
};


export default PageFolderIcon;
