import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderDatePickerInput from 'ui/common/formik-field/RenderDatePickerInput';
import PropTypes from 'prop-types';

const AttributesDateSettings = ({ prefixName }) => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          name={`${prefixName}validationRules.rangeStartDate`}
        >
          {formik => (<RenderDatePickerInput
            {...formik}
            label={<FormLabel labelId="app.from" />}
          />)}
        </Field >
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          name={`${prefixName}validationRules.rangeEndDate`}
        >
          {formik => (<RenderDatePickerInput
            {...formik}
            label={<FormLabel labelId="app.to" />}
          />)}
        </Field>
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          name={`${prefixName}validationRules.equalDate`}
        >
          {formik => (<RenderDatePickerInput
            {...formik}
            label={
              <FormLabel labelId="app.equal" />
          }
          />)}
        </Field>
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
      </fieldset>
    </Col>
  </Row>
);


AttributesDateSettings.propTypes = {
  prefixName: PropTypes.string,
};

AttributesDateSettings.defaultProps = {
  prefixName: '',
};

export default AttributesDateSettings;
