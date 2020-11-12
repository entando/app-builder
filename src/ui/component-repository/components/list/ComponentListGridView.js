import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'patternfly-react';
import cx from 'classnames';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import { componentType } from 'models/component-repository/components';

const renderComponentDate = (date, locale) => {
  const localDate = moment(date);
  localDate.locale(locale); // changing locale locally (refer to moment docs)
  return localDate.format('LL');
};

const ComponentListGridView = ({ components, locale }) => (
  <div className="ComponentListGridView equal">
    {components.map((component, i) => (
      <Col md={6} xs={6} key={component.code} className="ComponentList__component no-padding">
        <div className={cx('ComponentList__component-wrapper', i % 2 !== 0 && 'ComponentList__component-wrapper-odd')}>
          <Row key={component.code} className="no-gutter">
            <Col md={4} xs={4}>
              <a href="#">
                <ComponentImage component={component} />
              </a>
            </Col>
            <Col md={8} xs={8} className="no-gutter">
              <div className="ComponentList__component-body">
                <h1>{component.title}</h1>
                { component.lastUpdate && (
                  <span className="ComponentList__date">
                    {renderComponentDate(component.lastUpdate, locale) }
                  </span>
                  )}
                <p className="ComponentList__description">{component.description}</p>
                <div className="ComponentList__component-footer">
                  <div>
                    <FormattedMessage id="componentRepository.components.latestVersion" />{':'}&nbsp;
                    <span className="ComponentList__version">
                      {component.latestVersion.version}
                    </span>
                  </div>
                  <ComponentInstallActionsContainer component={component} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    ))}
  </div>
);

ComponentListGridView.propTypes = {
  components: PropTypes.arrayOf(componentType).isRequired,
  locale: PropTypes.string,
};

ComponentListGridView.defaultProps = {
  locale: 'en',
};

export default ComponentListGridView;
