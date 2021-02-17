import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const LinkConfigAttributes = () => (
  <div>
    <h2>
      <FormattedMessage id="linkconfig.attributes.heading" defaultMessage="Additional Attributes" />
    </h2>
    <Field
      component={RenderTextInput}
      name="rel"
      label="rel"
    />
    <Field
      component={RenderTextInput}
      name="target"
      label="target"
    />
    <Field
      component={RenderTextInput}
      name="hreflang"
      label="hreflang"
    />
  </div>
);

export default LinkConfigAttributes;
