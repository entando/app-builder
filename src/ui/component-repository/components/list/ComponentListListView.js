import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { componentType } from 'models/component-repository/components';

import { Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ComponentInstallActionsContainer from 'ui/component-repository/components/common/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/common/ComponentImage';

const ComponentListListView = ({ components }) => (
  <div className="ComponentListListView">
    {components.map((component) => {
      const date = moment(component.lastUpdate).format('MMMM, D, YYYY');

      return (
        <div key={component.id}>
          <div key={component.id} className="equal">
            <Col md={2} xs={2} className="no-padding">
              <a href="#" className="ComponentList_component-image-wrapper">
                <ComponentImage component={component} />
              </a>
            </Col>
            <Col md={8} xs={8}>
              <div className="ComponentList__component-body">
                <h1>{component.name}</h1>
                <span className="ComponentList__date">{date}</span>
                <span className="ComponentList__version">
                  <FormattedMessage id="componentRepository.components.latestVersion" />
                  : {component.version}
                </span>
              </div>
            </Col>
            <Col md={2} xs={4}>
              <ComponentInstallActionsContainer component={component} />
            </Col>
            <Col md={12} xs={12} className="no-padding">
              <div className="ComponentList__description">
                {component.description}
              </div>
            </Col>
          </div>
        </div>
      );
    })}
  </div>

);


ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListListView;
