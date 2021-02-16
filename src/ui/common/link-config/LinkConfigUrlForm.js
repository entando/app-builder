import React from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm,
  Field,
  FormSection,
} from 'redux-form';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import LinkConfigAttributes from 'ui/common/link-config/LinkConfigAttributes';

const label = <FormLabel labelText="URL" />;

const LinkConfigUrlForm = ({ onCancel, handleSubmit }) => (
  <form className="form-horizontal" onSubmit={handleSubmit}>
    <Field
      component={RenderTextInput}
      name="url"
      label={label}
    />
    <FormSection name="attributes">
      <LinkConfigAttributes />
    </FormSection>
    <div className="text-right">
      <Button
        bsStyle="default"
        style={{ marginRight: '10px' }}
        onClick={onCancel}
      >
        <FormattedMessage id="app.cancel" />
      </Button>
      <Button bsStyle="primary" type="submit">
        <FormattedMessage id="app.save" />
      </Button>
    </div>
  </form>
);

LinkConfigUrlForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'LinkConfigUrl',
})(LinkConfigUrlForm);
