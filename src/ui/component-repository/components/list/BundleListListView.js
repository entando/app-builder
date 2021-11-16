import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import DeploymentStatus from 'ui/component-repository/components/item/hub/DeploymentStatus';
import InstalledVersion from 'ui/component-repository/components/item/hub/InstalledVersion';
import { getECRComponentList } from 'state/component-repository/components/selectors';
import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';

const BundleListListView =
({ bundles, openComponentManagementModal, bundleStatuses }) => {
  const components = useSelector(getECRComponentList);
  return (
    <div className="ComponentListListView">
      {bundles.map((bundle) => {
        const bundleStatus = bundleStatuses.find(b => b.id === bundle.gitRepoAddress);
        const component = components.find(c => c.repoUrl === bundle.gitRepoAddress);
        return (
          <div
            key={`${bundle.gitRepoAddress}-${bundle.id}`}
            role="button"
            tabIndex={0}
            className="ComponentList__list-item"
            onClick={() => openComponentManagementModal(bundle)}
            onKeyDown={() => {}}
          >
            <div key={`${bundle.gitRepoAddress}-${bundle.id}`} className="equal">
              <div className="ComponentList__component-image-wrapper">
                <ComponentImage
                  component={{
                  ...bundle,
                  thumbnail: bundle.descriptionImage,
                  title: bundle.name,
                  }}
                />
              </div>
              <div className="ComponentList__component-body">
                <div className="ComponentList__component-content">
                  <p className="ComponentList__component-category">
                    <FormattedMessage id="componentRepository.categories.bundle" />
                  </p>
                  <h1>{bundle.name}</h1>
                  <p className="ComponentList__description">{bundle.description}</p>
                  <InstalledVersion
                    installed
                    version={bundleStatus && bundleStatus.installedVersion}
                  />
                  <DeploymentStatus bundleStatus={bundleStatus} />
                </div>
              </div>
              {
                component && (
                  <div className="ComponentList__component-footer" style={{ display: 'none' }}>
                    <ComponentInstallActionsContainer component={component} />
                  </div>
                )
              }
            </div>
          </div>
          );
      })}
    </div>
  );
};

BundleListListView.propTypes = {
  bundles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    descriptionImage: PropTypes.string,
    description: PropTypes.string,
    gitRepoAddress: PropTypes.string,
  })).isRequired,
  openComponentManagementModal: PropTypes.func,
  bundleStatuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    installedVersion: PropTypes.string,
  })),
};

BundleListListView.defaultProps = {
  openComponentManagementModal: () => {},
  bundleStatuses: [],
};

export default BundleListListView;
