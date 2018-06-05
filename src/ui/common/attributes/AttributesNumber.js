import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { isUndefined } from 'lodash';
import { isNumber } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const validateIsNumber = (value) => {
  if (isUndefined(value)) return undefined;
  return isNumber(value);
};

const AttributesNumber = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name="rangeStartNumber"
          label={
            <FormLabel labelId="app.from" />
          }
          validate={[validateIsNumber]}
        />
        <Field
          component={RenderTextInput}
          name="rangeEndNumber"
          label={
            <FormLabel labelId="app.to" />
          }
          validate={[validateIsNumber]}
        />
        <Field
          component={RenderTextInput}
          name="equalNumber"
          label={
            <FormLabel labelId="app.equal" />
          }
          validate={[validateIsNumber]}
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributesNumber;
