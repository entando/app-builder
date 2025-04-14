import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { isNumber } from '@entando/utils';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';
import PropTypes from 'prop-types';

const AttributesNumber = ({ prefixName }) => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.rangeStartNumber`}
          label={
            <FormLabel labelId="app.from" />
          }
          validate={value => convertReduxValidationsToFormikValidations(value, [isNumber])}
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.rangeEndNumber`}
          label={
            <FormLabel labelId="app.to" />
          }
          validate={value => convertReduxValidationsToFormikValidations(value, [isNumber])}
        />
        <Field
          component={RenderTextInput}
          name={`${prefixName}validationRules.equalNumber`}
          label={
            <FormLabel labelId="app.equal" />
          }
          validate={value => convertReduxValidationsToFormikValidations(value, [isNumber])}
        />
      </fieldset>
    </Col>
  </Row>
);


AttributesNumber.propTypes = {
  prefixName: PropTypes.string,
};

AttributesNumber.defaultProps = {
  prefixName: '',
};

export default AttributesNumber;
