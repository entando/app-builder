import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownButton, MenuItem } from 'patternfly-react';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';

// @TODO replace with correct versions
const VERSIONS = [
  {
    label: 'V 2.1',
    version: 'v2.1.0',
  },
  {
    label: 'V 2.2',
    version: 'v2.2.0',
  },
];

const BundlePreview = ({
  bundle: {
    name, hubName, bundleGroupName, description,
  },
}) => {
  const [deployVersion, setDeployVersion] = useState(VERSIONS[0]);
  return (
    <div className="BundlePreview">
      <div className="BundlePreview__info">
        <div className="BundlePreview__image">
          <ComponentImage component={{}} />
        </div>
        <div className="BundlePreview__meta">
          <div className="BundlePreview__bundle-name">
            {name}
          </div>
          <div className="BundlePreview__hub-name">
            {hubName}
          </div>
          <div className="BundlePreview__hub-name">
            {bundleGroupName}
          </div>
        </div>
        <div className="BundlePreview__select-version">
          <div className="BundlePreview__select-label">
            <FormattedMessage id="app.chooseAnOption" />
          </div>
          <div className="BundlePreview__version-dropdown">
            <DropdownButton
              id="BundlePreview__version-button"
              className="BundlePreview__version-button"
              title={deployVersion.label}
            >
              {
                VERSIONS.map(({ version, label }) => (
                  <MenuItem
                    key={version}
                    eventKey={{ version, label }}
                    onSelect={data => setDeployVersion(data)}
                  >
                    {label}
                  </MenuItem>
                ))
              }
            </DropdownButton>
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
};

BundlePreview.propTypes = {
  bundle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hubName: PropTypes.string,
    bundleGroupName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default BundlePreview;
