import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row } from 'patternfly-react';

import { formattedText } from '@entando/utils';

import ComponentInstallActions from 'ui/digital-exchange/components/common/ComponentInstallActions';
import ComponentImage from 'ui/digital-exchange/components/common/ComponentImage';

import StarRating from 'ui/digital-exchange/common/StarRating';
import { componentType } from 'state/digital-exchange/components/propTypes';


const ComponentListGridView = ({ components }) =>
  // const componentPairs = components
  //   .reduce((acc, component, index, sourceArray) => {
  //     if (index % 2 === 0) {
  //       acc.push(sourceArray.slice(index, index + 2));
  //     }
  //
  //     return acc;
  //   }, []);

  (
    <Row className="ComponentListGridView equal">

      {components.map((component) => {
        const date = moment(component.lastUpdate).format('MMMM, D, YYYY');
        return (
          <Col md={6} key={component.id} className="ComponentListGridView__component">
            <Row key={component.id} className="no-gutter">
              <Col md={4}>
                <a href="#">
                  <ComponentImage component={component} />
                </a>
                <ComponentInstallActions component={component} />
              </Col>
              <Col md={8} className="no-gutter">
                <div className="ComponentListGridView__component-body">
                  <h1>{component.name}</h1>
                  <span className="ComponentListGridView__date">{date}</span>
                  <span className="ComponentListGridView__version">
                    {formattedText('digitalExchange.components.latestVersion')}: {component.version}
                  </span>
                  <span className="ComponentListGridView__rating">
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
