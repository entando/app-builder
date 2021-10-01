import React, { useState } from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderDatePickerInput from 'ui/common/form/RenderDatePickerInput';

const AttributesDateSettings = () => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const dateFormat = 'DD/MM/YYYY';
  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.settings" />
          </legend>
          <Field
            component={RenderDatePickerInput}
            name="rangeStartDate"
            dateFormat={dateFormat}
            label={<FormLabel labelId="cms.label.from" />}
            onPickDate={date => setFromDate(moment(date, dateFormat))}
            maxDate={toDate}
          />
          <Col xs={10} xsOffset={2}>
            <div className="AttributesDateSettings__placeholder">
              <FormattedMessage id="cms.label.date.placeholder" />
            </div>
          </Col>
          <Field
            component={RenderDatePickerInput}
            name="rangeEndDate"
            dateFormat={dateFormat}
            label={<FormLabel labelId="cms.label.to" />}
            onPickDate={date => setToDate(moment(date, dateFormat))}
            minDate={fromDate}
          />
          <Col xs={10} xsOffset={2}>
            <div className="AttributesDateSettings__placeholder">
              <FormattedMessage id="cms.label.date.placeholder" />
            </div>
          </Col>
          <Field
            component={RenderDatePickerInput}
            name="equalDate"
            dateFormat={dateFormat}
            label={<FormLabel labelId="cms.label.equal" />}
          />
          <Col xs={10} xsOffset={2}>
            <div className="AttributesDateSettings__placeholder">
              <FormattedMessage id="cms.label.date.placeholder" />
            </div>
          </Col>
        </fieldset>
      </Col>
    </Row>
  );
};

export default AttributesDateSettings;
