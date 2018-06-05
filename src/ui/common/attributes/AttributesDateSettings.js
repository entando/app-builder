import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import moment from 'moment';
import FormLabel from 'ui/common/form/FormLabel';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

const DATE_FORMAT = 'DD/MM/YYYY';

const rangeEndDateNormalize = (value, previousValue, values) => {
  const momentMinDate = moment(values.validationRules.rangeStartDate, DATE_FORMAT, true);
  const momentMaxDate = moment(value, DATE_FORMAT, true);
  if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
    return value;
  }
  if (!momentMaxDate.isAfter(momentMinDate)) {
    return momentMinDate.add(1, 'd').format(DATE_FORMAT);
  }
  return value;
};

const rangeStartDateNormalize = (value, previousValue, values) => {
  const momentMaxDate = moment(values.validationRules.rangeEndDate, DATE_FORMAT, true);
  const momentMinDate = moment(value, DATE_FORMAT, true);
  if (!momentMinDate.isValid() || !momentMaxDate.isValid()) {
    return value;
  }
  if (!momentMinDate.isBefore(momentMaxDate)) {
    return momentMaxDate.subtract(1, 'd').format(DATE_FORMAT);
  }
  return value;
};

const AttributesDateSettings = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderDatePickerInput}
          name="rangeStartDate"
          dateFormat={DATE_FORMAT}
          label={
            <FormLabel labelId="app.from" />
          }
          normalize={rangeStartDateNormalize}
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="rangeEndDate"
          dateFormat={DATE_FORMAT}
          label={
            <FormLabel labelId="app.to" />
          }
          normalize={rangeEndDateNormalize}
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="equalDate"
          dateFormat={DATE_FORMAT}
          label={
            <FormLabel labelId="app.equal" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
      </fieldset>
    </Col>
  </Row>
);

export default AttributesDateSettings;
