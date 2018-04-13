import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
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
        />
        <Field
          component={RenderTextInput}
          name="maxLength"
          label={
            <FormLabel labelId="app.maxLength" />
          }
        />
        <Field
          component={RenderTextInput}
          name="regexp"
          label={
            <FormLabel labelId="app.regexp" />
          }
        />
      </fieldset>
    </Col>
  </Row>
);

AttributeHypeLongMonoTextSettings.propTypes = {
};

AttributeHypeLongMonoTextSettings.defaultProps = {
};


export default AttributeHypeLongMonoTextSettings;
