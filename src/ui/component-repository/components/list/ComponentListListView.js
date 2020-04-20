import React from 'react';
import PropTypes from 'prop-types';
import { componentType } from 'models/component-repository/components';

import { Col, Row } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ComponentInstallActionsContainer from 'ui/component-repository/components/common/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/common/ComponentImage';
import StarRating from 'ui/component-repository/common/StarRating';

import moment from 'moment';


const ComponentListListView = ({ components }) => (
  <div className="ComponentListListView">
    {components.map((component) => {
      const date = moment(component.lastUpdate).format('MMMM, D, YYYY');

      return (
        <div key={component.id}>
          <Row key={component.id} className="equal">
            <Col md={2} className="no-padding">
              <a href="#" className="ComponentList_component-image-wrapper">
                <ComponentImage component={component} />
              </a>
            </Col>
            <Col md={8}>
              <div className="ComponentList__component-body">
                <h1>{component.name}</h1>
                <span className="ComponentList__date">{date}</span>
                <span className="ComponentList__version">
                  <FormattedMessage id="componentRepository.components.latestVersion" />
                  : {component.version}
                </span>
                <span className="ComponentList__rating">
                  <StarRating maxRating={5} rating={component.rating} />
                </span>
              </div>
            </Col>
            <Col md={2}>
              <ComponentInstallActionsContainer component={component} />
            </Col>
            <Col md={12} className="no-padding">
              <div className="ComponentList__description">
                {component.description}
              </div>
            </Col>
          </Row>
        </div>
      );
    })}
  </div>

);


ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListListView;
