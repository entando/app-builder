import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col } from 'patternfly-react';
import cx from 'classnames';

import ComponentImage from 'ui/component-repository/components/item/ComponentImage';

const BundleListGridView =
({ bundles, openComponentManagementModal, bundleStatuses }) => (
  <div className="ComponentListGridView equal">
    {bundles.map((bundle, i) => {
      const bundleStatus = bundleStatuses.find(b => b.id === bundle.gitRepoAddress);
      return (
        <Col
          md={6}
          xs={6}
          key={bundle.gitRepoAddress}
          className={cx('ComponentList__component', i % 2 === 0 && 'ComponentList__component--odd', 'no-padding')}
        >
          <div
            role="button"
            tabIndex={-1 * i}
            className="ComponentList__component-wrapper"
            onClick={() => openComponentManagementModal(bundle)}
            onKeyDown={() => openComponentManagementModal(bundle)}
          >

            <div className="ComponentList__component-image-wrapper">
              <ComponentImage
                component={{ ...bundle, thumbnail: bundle.descriptionImage, title: bundle.name }}
              />
            </div>

            <div className="ComponentList__component-body">
              <div className="ComponentList__component-content">
                <p className="ComponentList__component-category">
                  <React.Fragment>
                    <FormattedMessage id="componentRepository.categories.bundle" />
                  </React.Fragment>
                </p>
                <h1>{bundle.name}</h1>
                <p className="ComponentList__description">{bundle.description}</p>
                {
                  bundleStatus && bundleStatus.status && (
                    <div className="ComponentList__version-container">
                      <FormattedMessage id="hub.bundle.status" />{':'}&nbsp;
                      <span className="ComponentList__version">
                        {bundleStatus.status === 'NOT_FOUND' ? <FormattedMessage id="hub.bundle.undeployed" /> :
                        <FormattedMessage id={`hub.bundle.${bundleStatus.status}`} />}
                        {bundleStatus.status === 'INSTALLED' && ` (${bundleStatus.installedVersion})`}
                      </span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </Col>
      );
    })}
  </div>
);

BundleListGridView.propTypes = {
  bundles: PropTypes.arrayOf({
    name: PropTypes.string,
    descriptionImage: PropTypes.string,
    description: PropTypes.string,
    gitRepoAddress: PropTypes.string,
  }).isRequired,
  openComponentManagementModal: PropTypes.func,
  bundleStatuses: PropTypes.arrayOf({
    id: PropTypes.string,
    status: PropTypes.string,
    installedVersion: PropTypes.string,
  }),
};

BundleListGridView.defaultProps = {
  openComponentManagementModal: () => {},
  bundleStatuses: [],
};

export default BundleListGridView;
