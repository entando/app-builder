import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ComponentEasyUninstall = (props) => {
  const {
    bundle: {
      name, description, version, componentTypes,
    },
  } = props;
  return (
    <div className="BundlePreview">
      <div className="BundlePreview__info">
        <div className="BundlePreview__meta BundlePreview__meta--uninstall">
          <div className="BundlePreview__bundle-name BundlePreview__bundle-name--uninstall">
            {name}
          </div>
          <p className="BundlePreview__hub-name">
            {componentTypes
                      ? componentTypes.map((category, x) => (
                        <React.Fragment key={category}>
                          <FormattedMessage id={`componentRepository.categories.${category}`} />
                          {x < componentTypes.length - 1 && ', '}
                        </React.Fragment>)) : null
                    }
          </p>
        </div>
        <div className="BundlePreview__versioning">
          <span className="BundlePreview__versioning__title">
            <FormattedMessage id="app.filterTypesSelect.version" />
          </span>
          <span className="BundlePreview__versioning__version">
            {version}
          </span>
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

ComponentEasyUninstall.propTypes = {
  bundle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    version: PropTypes.string.isRequired,
    componentTypes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ComponentEasyUninstall;
