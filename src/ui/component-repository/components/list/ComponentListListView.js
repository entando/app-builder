import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import { componentType } from 'models/component-repository/components';

const ComponentListListView =
({ components, onClickInstallPlan, openComponentManagementModal }) => (
  <div className="ComponentListListView">
    {components.map((component, i) => (
      <div
        key={component.code}
        role="button"
        tabIndex={-1 * i}
        className="ComponentList__list-item"
        onClick={() => openComponentManagementModal(component)}
        onKeyDown={() => openComponentManagementModal(component)}
      >
        <div key={component.code} className="equal">
          <div className="ComponentList__component-image-wrapper">
            <ComponentImage component={component} />
          </div>
          <div className="ComponentList__component-body">
            <div className="ComponentList__component-content">
              <p className="ComponentList__component-category">
                {component.componentTypes
                  && component.componentTypes.map((category, x) => (
                    <React.Fragment>
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
              <div className="ComponentList__version-container">
                <FormattedMessage id="componentRepository.components.latestVersion" />{':'}&nbsp;
                <span className="ComponentList__version">
                  {(component.latestVersion || {}).version}
                </span>
              </div>
            </div>
            <div className="ComponentList__component-footer">
              <ComponentInstallActionsContainer component={component} />
            </div>
          </div>
        </div>
      </div>
      ))}
  </div>
);

ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
  onClickInstallPlan: PropTypes.func.isRequired,
  openComponentManagementModal: PropTypes.func,
};

ComponentListListView.defaultProps = {
  openComponentManagementModal: () => {},
};

export default ComponentListListView;
