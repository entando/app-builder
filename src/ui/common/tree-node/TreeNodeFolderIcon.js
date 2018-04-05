import React from 'react';
import PropTypes from 'prop-types';


const TreeNodeFolderIcon = ({ empty }) => (
  (empty) ?
    <i className="fa fa-folder-o TreeNodeFolderIcon" /> :
    <i className="fa fa-folder TreeNodeFolderIcon" />
);

TreeNodeFolderIcon.propTypes = {
  empty: PropTypes.bool,
};

TreeNodeFolderIcon.defaultProps = {
  empty: false,
};


export default TreeNodeFolderIcon;
