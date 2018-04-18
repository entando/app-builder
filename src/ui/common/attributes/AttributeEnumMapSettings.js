import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { formattedText } from 'frontend-common-components';
import { required } from 'util/validateForm';

const elements = value =>
  (value && !/^(\w+)=([^\s]+)$/i.test(value)
    ? <FormattedMessage id="validateForm.elements" /> : undefined);


const AttributeEnumEnumMapSettings = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="app.settings" />
        </legend>
        <Field
          component={RenderTextInput}
          name="enumeratorStaticItems"
          label={
            <FormLabel labelId="app.enumeratorStaticItems" required />
          }
          validate={[required, elements]}
          placeholder={formattedText('app.enumeratorStaticItemsMap.help')}
        />
        <Field
          component={RenderTextInput}
          name="enumeratorStaticItemsSeparator"
          label={
            <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
            }
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributeEnumEnumMapSettings;
