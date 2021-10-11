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
          <FormattedMessage id="cms.label.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name="minLength"
          label={<FormLabel labelId="cms.label.minLength" />}
          validate={[isNumber]}
        />
        <Field
          component={RenderTextInput}
          name="maxLength"
          label={<FormLabel labelId="cms.label.maxLength" />}
          validate={[isNumber]}
        />
        <Field
          component={RenderTextInput}
          name="regex"
          label={<FormLabel labelId="cms.label.regexp" />}
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributeHypeLongMonoTextSettings;
