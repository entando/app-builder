import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Button } from 'patternfly-react';
import cx from 'classnames';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import { componentType } from 'models/component-repository/components';

const ComponentListGridView = ({ components, onClickInstallPlan }) => (
  <div className="ComponentListGridView equal">
    {components.map((component, i) => (
      <Col
        md={6}
        xs={6}
        key={component.code}
        className={cx('ComponentList__component', i % 2 === 0 && 'ComponentList__component--odd', 'no-padding')}
      >
        <div className="ComponentList__component-wrapper">

          <div className="ComponentList__component-image-wrapper">
            <ComponentImage component={component} />
          </div>

          <div className="ComponentList__component-body">
            <div className="ComponentList__component-content">
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
            </div>
            <div className="ComponentList__component-footer">
              <div>
                <FormattedMessage id="componentRepository.components.latestVersion" />{':'}&nbsp;
                <span className="ComponentList__version">
                  {(component.latestVersion || {}).version}
                </span>
              </div>
              <ComponentInstallActionsContainer component={component} />
            </div>
          </div>
        </div>
      </Col>
    ))}
  </div>
);

ComponentListGridView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
  onClickInstallPlan: PropTypes.func.isRequired,
};

export default ComponentListGridView;
