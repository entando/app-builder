import React from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

const AttributeInfoComposite = () => (
  <Row>
    <Col xs={12}>
      <fieldset className="no-padding">
        <legend>
          <FormattedMessage id="cms.label.info" />
          <div className="ContentTypeForm__required-fields text-right">
            * <FormattedMessage id="cms.label.fieldsRequired" />
          </div>
        </legend>
        <Field
          component={RenderTextInput}
          name="compositeAttributeType"
          label={<FormLabel labelId="cms.contenttype.form.type" />}
          disabled
        />
      </fieldset>
    </Col>
  </Row>
);

export default AttributeInfoComposite;
