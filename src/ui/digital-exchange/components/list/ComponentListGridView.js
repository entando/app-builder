import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ComponentInstallActionsContainer from 'ui/digital-exchange/components/common/ComponentInstallActionsContainer';
import ComponentImage from 'ui/digital-exchange/components/common/ComponentImage';
import StarRating from 'ui/digital-exchange/common/StarRating';
import { componentType } from 'models/digital-exchange/components';


const ComponentListGridView = ({ components }) =>
  (
    <Row className="ComponentListGridView equal">
      {components.map((component) => {
        const date = moment(component.lastUpdate).format('MMMM, D, YYYY');
        return (
          <Col md={6} key={component.id} className="ComponentList__component">
            <Row key={component.id} className="no-gutter">
              <Col md={4}>
                <a href="#">
                  <ComponentImage component={component} />
                </a>
                <ComponentInstallActionsContainer component={component} />
              </Col>
              <Col md={8} className="no-gutter">
                <div className="ComponentList__component-body">
                  <h1>{component.name}</h1>
                  <span className="ComponentList__date">{date}</span>
                  <span className="ComponentList__version">
                    <FormattedMessage id="digitalExchange.components.latestVersion" />
                    : {component.version}
                  </span>
                  <span className="ComponentList__rating">
                    <StarRating maxRating={5} rating={component.rating} />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        );
      })
      }
    </Row>
  );
ComponentListGridView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListGridView;
