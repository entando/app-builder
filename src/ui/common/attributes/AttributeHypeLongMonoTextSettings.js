import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { isNumber } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const AttributeHypeLongMonoTextSettings = () => (
  <Row>

    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name="minLength"
          label={
            <FormLabel labelId="app.minLength" />
          }
          validate={[isNumber]}
        />
        <Field
          component={RenderTextInput}
          name="maxLength"
          label={
            <FormLabel labelId="app.maxLength" />
          }
          validate={[isNumber]}
        />
        <Field
          component={RenderTextInput}
          name="regex"
          label={
            <FormLabel labelId="app.regexp" />
          }
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributeHypeLongMonoTextSettings;
