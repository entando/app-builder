import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import ComponentInstallActionsContainer from 'ui/component-repository/components/common/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/common/ComponentImage';
import { componentType } from 'models/component-repository/components';


const ComponentListGridView = ({ components }) =>
  (
    <div className="ComponentListGridView equal">
      {components.map((component) => {
        const date = moment(component.lastUpdate).format('MMMM, D, YYYY');
        return (
          <Col md={6} xs={6} key={component.id} className="ComponentList__component no-padding">
            <Row key={component.id} className="no-gutter">
              <Col md={4} xs={4}>
                <a href="#">
                  <ComponentImage component={component} />
                </a>
                <ComponentInstallActionsContainer component={component} />
              </Col>
              <Col md={8} xs={8} className="no-gutter">
                <div className="ComponentList__component-body">
                  <h1>{component.name}</h1>
                  <span className="ComponentList__date">{date}</span>
                  <span className="ComponentList__version">
                    <FormattedMessage id="componentRepository.components.latestVersion" />
                    : {component.version}
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        );
      })
      }
    </div>
  );
ComponentListGridView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
};

export default ComponentListGridView;
