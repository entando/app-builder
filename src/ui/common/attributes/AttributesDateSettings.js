import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

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
          label={
            <FormLabel labelId="app.from" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="rangeEndDate"
          label={
            <FormLabel labelId="app.to" />
          }
        />
        <Col xs={10} xsOffset={2}>
          <div className="AttributesDateSettings__placeholder">
            <FormattedMessage id="app.date.placeholder" />
          </div>
        </Col>
        <Field
          component={RenderDatePickerInput}
          name="equalDate"
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
