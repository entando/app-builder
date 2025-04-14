import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/formik-field/RenderSwitchInput';
import PropTypes from 'prop-types';

const AttributeOgnlValidation = ({ prefixName }) => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.ognl.validation" />
        </legend>
        <p><FormattedMessage id="app.ognl.validation.help1" /></p>
        <p><FormattedMessage id="app.ognl.validation.help2" /></p>
        <p><FormattedMessage id="app.ognl.validation.help3" /></p>
        <p><FormattedMessage id="app.ognl.validation.help4" /></p>
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.ognlValidation.ognlExpression`}
          label={
            <FormLabel labelId="app.ognl.expression" />
          }
        />
        <FormGroup>
          <label htmlFor="mandatory" className="col-xs-2 control-label">
            <FormLabel labelId="app.apply.expression" />
          </label>
          <Col xs={4}>
            <Field component={SwitchRenderer} name={`${prefixName}validationRules.ognlValidation.applyOnlyToFilledAttr`} />
          </Col>
        </FormGroup>

        <p>
          <FormattedMessage id="app.ognl.validation.add.message.help" />
        </p>

        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.ognlValidation.helpMessage`}
          label={
            <FormLabel labelId="app.help.message" />
          }
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.ognlValidation.keyForHelpMessage`}
          label={
            <FormLabel labelId="app.help.message.key" />
          }
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.ognlValidation.errorMessage`}
          label={
            <FormLabel labelId="app.error.message" />
          }
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.ognlValidation.keyForErrorMessage`}
          label={
            <FormLabel labelId="app.error.message.key" />
                }
        />
      </fieldset>
    </Col>
  </Row>
);

AttributeOgnlValidation.propTypes = {
  prefixName: PropTypes.string,
};

AttributeOgnlValidation.defaultProps = {
  prefixName: '',
};


export default AttributeOgnlValidation;
