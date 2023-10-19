import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { isNumber } from '@entando/utils';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';
import PropTypes from 'prop-types';

const AttributeHypeLongMonoTextSettings = ({ prefixName }) => (
  <Row>

    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.minLength`}
          label={
            <FormLabel labelId="app.minLength" />
          }
          validate={value => convertReduxValidationsToFormikValidations(value, [isNumber])}
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.maxLength`}
          label={
            <FormLabel labelId="app.maxLength" />
          }
          validate={value => convertReduxValidationsToFormikValidations(value, [isNumber])}
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.regex`}
          label={
            <FormLabel labelId="app.regexp" />
          }
        />
      </fieldset>
    </Col>
  </Row>
);


AttributeHypeLongMonoTextSettings.propTypes = {
  prefixName: PropTypes.string,
};

AttributeHypeLongMonoTextSettings.defaultProps = {
  prefixName: '',
};

export default AttributeHypeLongMonoTextSettings;
