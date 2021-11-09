import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';

const BundlePreview = ({
  bundle: {
    name, description, descriptionImage,
  },
  hubName,
  bundleGroupNames,
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
          {bundleGroupNames.join(', ')}
        </div>
      </div>
    </div>
    <div className="BundlePreview__description">
      <div className="BundlePreview__description-title">
        <FormattedMessage id="app.filterTypesSelect.description" />
      </div>
      <div className="BundlePreview__description-body">
        {description}
      </div>
    </div>
  </div>
);

BundlePreview.propTypes = {
  bundle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    descriptionImage: PropTypes.string,
  }).isRequired,
  hubName: PropTypes.string.isRequired,
  bundleGroupNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BundlePreview;
