import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Button } from 'patternfly-react';
import cx from 'classnames';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import { componentType } from 'models/component-repository/components';
import DeploymentStatus from 'ui/component-repository/components/item/hub/DeploymentStatus';
import InstalledVersion from 'ui/component-repository/components/item/hub/InstalledVersion';

const ComponentListGridView =
({
  components, onClickInstallPlan, openComponentManagementModal, bundleStatuses,
}) => (
  <div className="ComponentListGridView equal">
    {components.map((component, i) => {
      const bundleStatus = bundleStatuses.find(b => b.id === component.repoUrl);
      return (
        <Col
          md={6}
          xs={6}
          key={component.code}
          className={cx('ComponentList__component', i % 2 === 0 && 'ComponentList__component--even', 'no-padding')}
        >
          <div
            key={component.code}
            className="ComponentList__component-wrapper"
          >

            <div
              className="ComponentList__component-image-wrapper"
              role="button"
              tabIndex={0}
              onClick={() => openComponentManagementModal(component)}
              onKeyDown={() => {}}
            >
              <ComponentImage component={component} />
            </div>

            <div className="ComponentList__component-body">
              <div
                className="ComponentList__component-content"
                role="button"
                tabIndex={0}
                onClick={() => openComponentManagementModal(component)}
                onKeyDown={() => {}}
              >
                <p className="ComponentList__component-category">
                  {component.componentTypes
                    && component.componentTypes.map((category, x) => (
                      <React.Fragment key={category}>
                        <FormattedMessage id={`componentRepository.categories.${category}`} />
                        { x < component.componentTypes.length - 1 && ', '}
                      </React.Fragment>))
                  }
                </p>
                <h1>{component.title}</h1>
                {
                  component.installed &&
                    <div>
                      <Button
                        bsStyle="link"
                        className="ComponentList__show-install-plan"
                        onClick={() => onClickInstallPlan(component)}
                      >
                        <i className="fa fa-info-circle" />
                        {' '}
                        {
                          component.customInstallation
                          ? <FormattedMessage id="componentRepository.components.showCustomInstallPlan" />
                          : <FormattedMessage id="componentRepository.components.showInstallPlan" />
                        }
                      </Button>
                    </div>
                }
                <p className="ComponentList__description">{component.description}</p>
                <InstalledVersion version={(component.latestVersion || {}).version} />
                <DeploymentStatus bundleStatus={bundleStatus} />
              </div>
              <div className="ComponentList__component-footer" style={{ display: 'none' }}>
                <ComponentInstallActionsContainer component={component} />
              </div>
            </div>
          </div>
        </Col>
      );
    })}
  </div>
);

ComponentListGridView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
  onClickInstallPlan: PropTypes.func.isRequired,
  openComponentManagementModal: PropTypes.func,
  bundleStatuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    installedVersion: PropTypes.string,
  })),
};

ComponentListGridView.defaultProps = {
  openComponentManagementModal: () => {},
  bundleStatuses: [],
};

export default ComponentListGridView;
