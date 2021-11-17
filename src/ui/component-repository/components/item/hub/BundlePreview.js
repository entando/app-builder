import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';

const BundlePreview = ({
  bundle: {
    name, descriptionImage,
  },
  hubName,
  bundleGroup,
}) => (
  <div className="BundlePreview">
    <div className="BundlePreview__info">
      <div className="BundlePreview__image">
        <ComponentImage component={{ thumbnail: descriptionImage, title: name, code: name }} />
      </div>
      <div className="BundlePreview__meta">
        <div className="BundlePreview__bundle-name">
          {name}
        </div>
        <div className="BundlePreview__hub-name">
          {hubName}
        </div>
        <div className="BundlePreview__hub-name">
          {(bundleGroup || {}).name || ''}
        </div>
      </div>
    </div>
    <div className="BundlePreview__description">
      <div className="BundlePreview__description-title">
        <FormattedMessage id="app.filterTypesSelect.description" />
      </div>
      <div className="BundlePreview__description-body">
        {(bundleGroup || {}).description || ''}
      </div>
    </div>
  </div>
);

BundlePreview.propTypes = {
  bundle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    descriptionImage: PropTypes.string,
  }).isRequired,
  hubName: PropTypes.string.isRequired,
  bundleGroup: PropTypes.PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default BundlePreview;
