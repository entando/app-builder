import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const AttributeRole = {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.role" />
            </legend>
            <FormGroup>
              <label htmlFor="mandatory" className="col-xs-2 control-label">
                <FormLabel labelId="app.mandatory" />
              </label>
              <Col xs={4}>
                <Field component={SwitchRenderer} name="mandatory" />
              </Col>
            </FormGroup>
          </fieldset>
        </Col>
      </Row>
    );
  },
};

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
};


export default AttributeRole;
