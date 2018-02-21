import React from 'react';
import PropTypes from 'prop-types';
import PageFolderIcon from 'ui/page-tree/PageFolderIcon';

const PageTreePreview = ({ rowData, locale }) => (
  <div className="PageTreePreview">
    <button className="btn btn-primary">
      <i className="fa fa-arrows" />
    </button>
    <PageFolderIcon empty={rowData.isEmpty} />
    <span className="PageTree__page-name">
      { rowData.titles[locale] }
    </span>
  </div>
);

PageTreePreview.propTypes = {
  rowData: PropTypes.shape({}).isRequired,
  locale: PropTypes.string.isRequired,
};

export default PageTreePreview;
