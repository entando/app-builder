import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales';
import { FormattedMessage } from 'react-intl';
import { Col } from 'patternfly-react';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import { componentType } from 'models/component-repository/components';

const renderComponentDate = (date, locale) => {
  const localDate = moment(date);
  localDate.locale(locale); // changing locale locally (refer to moment docs)
  return localDate.format('LL');
};

const ComponentListListView = ({ components, locale }) => (

  <div className="ComponentListListView">
    {components.map(component => (
      <div key={component.code} className="ComponentList__list-item">
        <div key={component.code} className="equal">
          <Col xs={2} md={2} sm={2} className="no-padding">
            <a href="#" className="ComponentList_component-image-wrapper">
              <ComponentImage component={component} />
            </a>
          </Col>
          <Col xs={7} md={8} sm={8} className="no-padding">
            <div className="ComponentList__component-body">
              <h1>{component.title}</h1>
              { component.lastUpdate && (
                <span className="ComponentList__date">
                  {renderComponentDate(component.lastUpdate, locale) }
                </span>
              )}
              <span className="ComponentList__version">
                <FormattedMessage id="componentRepository.components.latestVersion" />
                  : {component.latestVersion.version}
              </span>
            </div>
          </Col>
          <Col xs={3} md={2} sm={2} className="no-padding">
            <ComponentInstallActionsContainer component={component} />
          </Col>
          <Col xs={12} md={12} sm={12} className="no-padding">
            <div className="ComponentList__description">
              {component.description}
            </div>
          </Col>
        </div>
      </div>
      ))}
  </div>
);

ComponentListListView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
  locale: PropTypes.string,
};

ComponentListListView.defaultProps = {
  locale: 'en',
};

export default ComponentListListView;
