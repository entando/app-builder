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

const LinkConfigUrlForm = ({
  onCancel, handleSubmit, url, attributes,
}) => (
  <form className="form-horizontal">
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
        <FormattedMessage id="cms.label.cancel" />
      </Button>
      <Button bsStyle="primary" onClick={() => handleSubmit({ url, attributes })}>
        <FormattedMessage id="cms.label.save" />
      </Button>
    </div>
  </form>
);

LinkConfigUrlForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  url: PropTypes.string,
  attributes: PropTypes.shape({}),
};

LinkConfigUrlForm.defaultProps = {
  url: '',
  attributes: {},
};

export default reduxForm({
  form: 'LinkConfigUrl',
})(LinkConfigUrlForm);
