import React from 'react';
import PropTypes from 'prop-types';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';

const PageTreePreview = ({ rowData }) => (
  <div className="PageTreePreview">
    <button className="btn btn-primary">
      <i className="fa fa-arrows" />
    </button>
    <TreeNodeFolderIcon empty={rowData.isEmpty} />
    <span className="PageTree__page-name">
      { rowData.title }
    </span>
  </div>
);

PageTreePreview.propTypes = {
  rowData: PropTypes.shape({
    isEmpty: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PageTreePreview;
