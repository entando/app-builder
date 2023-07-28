import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ComponentDependenciesTable from 'ui/component-repository/components/item/install-controls/ComponentDependenciesTable';
import ComponentUninstallProcessState from './ComponentUninstallProcessState';

const ComponentUninstallStart = (props) => {
  const {
    bundle: {
      name, description, version, componentTypes,
    },
    componentDependencies,
    dependenciesPartiallyDeleted,
    componentUninstallStatus,
    progress,
    lastInstallApiResponse,
  } = props;

  const autoUninstallNotPossible = componentDependencies && componentDependencies.length > 0;
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
      {
        !componentUninstallStatus && progress !== 1 ? (
          <div>
            <div className="BundlePreview__description">
              <div className="BundlePreview__description-title">
                <FormattedMessage id="app.filterTypesSelect.description" />
              </div>
              <div className="BundlePreview__description-body BundlePreview__description-body--error">
                {description}
              </div>
            </div>
            {
            dependenciesPartiallyDeleted ? (
              <div className="BundlePreview__error-wrapper">
                <p className="BundlePreview__description-body BundlePreview__description-body--error">
                  <FormattedMessage
                    id="ecr.componentPartiallyDeleted"
                    values={{ name }}
                  />
                </p>
                <div className="BundlePreview__divider" />
              </div>
            ) : null
          }
            {
            autoUninstallNotPossible ? (
              <div className="BundlePreview__error-wrapper">
                <p className="BundlePreview__error-message">
                  <FormattedMessage
                    id="ecr.componentUninstallError"
                    values={{ name }}
                  />
                </p>
                <div className="BundlePreview__divider" />
              </div>
            ) : null
          }
            {
            autoUninstallNotPossible ? (
              <ComponentDependenciesTable
                dependencies={componentDependencies.filter(c => c.hasExternal)}
              />
            ) : null
          }
          </div>
        ) : (
          <ComponentUninstallProcessState
            progress={progress}
            name={name}
            lastInstallApiResponse={lastInstallApiResponse}
            componentUninstallStatus={componentUninstallStatus}
          />
        )
      }
    </div>
  );
};

ComponentUninstallStart.propTypes = {
  bundle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    version: PropTypes.string.isRequired,
    componentTypes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  componentDependencies: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  dependenciesPartiallyDeleted: PropTypes.bool,
  componentUninstallStatus: PropTypes.string,
  progress: PropTypes.number,
  lastInstallApiResponse: PropTypes.shape({}),
};

ComponentUninstallStart.defaultProps = {
  componentDependencies: [],
  dependenciesPartiallyDeleted: false,
  componentUninstallStatus: '',
  progress: 0,
  lastInstallApiResponse: {},
};

export default ComponentUninstallStart;
