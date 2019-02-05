import React from 'react';
import PropTypes from 'prop-types';
import { componentType } from 'models/digital-exchange/components';

import { Col, Row } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ComponentInstallActionsContainer from 'ui/digital-exchange/components/common/ComponentInstallActionsContainer';
import ComponentImage from 'ui/digital-exchange/components/common/ComponentImage';
import StarRating from 'ui/digital-exchange/common/StarRating';

import moment from 'moment';


const ComponentListListView = ({ components }) => (
  components.map((component) => {
    const date = moment(component.lastUpdate).format('MMMM, D, YYYY');

    return (
      <div key={component.id} className="ComponentList ComponentListListView">
        <Row key={component.id}>
          <Col md={4} className="no-padding">
            <a href="#">
              <ComponentImage component={component} />
            </a>
            <ComponentInstallActionsContainer component={component} />
          </Col>
          <Col md={8}>
            <div className="ComponentListGridView__component-body">
              <h1>{component.name}</h1>
              <span className="ComponentListGridView__date">{date}</span>
              <span className="ComponentListGridView__version">
                <FormattedMessage id="digitalExchange.components.latestVersion" />
                : {component.version}
              </span>
              <span className="ComponentListGridView__rating">
                <StarRating maxRating={5} rating={component.rating} />
              </span>
            </div>
          </Col>
          <Col md={12} className="no-padding">
            <div className="ComponentList__description">
              {component.description}
            </div>
          </Col>
        </Row>
      </div>
    );
  })
);


ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListListView;
