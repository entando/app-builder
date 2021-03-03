import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { required } from '@entando/utils';

import PageTitle from 'ui/internal-page/PageTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const msgs = defineMessages({
  formLabel: {
    id: 'emailConfig.senderMgmt.new',
    defaultMessage: 'New Sender',
  },
});

const AddEmailSenderFormBody = ({
  intl, handleSubmit, invalid, submitting,
}) => (
  <div>
    <PageTitle titleId="emailConfig.senderMgmt.new" helpId="emailConfig.help" />
    <Form aria-label={intl.formatMessage(msgs.formLabel)} onSubmit={handleSubmit} horizontal>
      <Field
        component={RenderTextInput}
        name="code"
        label={<FormLabel labelId="app.code" required />}
        validate={required}
      />
      <Field
        component={RenderTextInput}
        name="email"
        label={<FormLabel labelId="emailConfig.senderMgmt.email" required />}
        validate={required}
      />
      <Button
        type="submit"
        bsStyle="primary"
        className="pull-right"
        disabled={invalid || submitting}
      >
        <FormattedMessage id="app.save" />
      </Button>
    </Form>
  </div>
);

AddEmailSenderFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const AddEmailSenderForm = injectIntl(reduxForm({
  form: 'emailSender',
  enableReinitialize: true,
})(AddEmailSenderFormBody));

export default AddEmailSenderForm;
