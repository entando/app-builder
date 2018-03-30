import React from 'react';
import PropTypes from 'prop-types';


const CategoryFolderIcon = ({ empty }) => (
  (empty) ?
    <i className="fa fa-folder-o CategoryFolderIcon" /> :
    <i className="fa fa-folder CategoryFolderIcon" />
);

CategoryFolderIcon.propTypes = {
  empty: PropTypes.bool,
};

CategoryFolderIcon.defaultProps = {
  empty: false,
};


export default CategoryFolderIcon;
