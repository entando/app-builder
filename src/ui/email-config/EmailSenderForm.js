import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { required } from '@entando/utils';

import PageTitle from 'ui/internal-page/PageTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const EmailSenderFormBody = ({
  intl, titleId, handleSubmit, invalid, submitting, editing,
}) => (
  <div>
    <PageTitle titleId={titleId} helpId="emailConfig.help" />
    <Form aria-label={intl.formatMessage({ id: titleId })} onSubmit={handleSubmit} horizontal>
      <Field
        component={RenderTextInput}
        name="code"
        label={<FormLabel labelId="app.code" required />}
        validate={required}
        disabled={editing}
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

EmailSenderFormBody.propTypes = {
  intl: intlShape.isRequired,
  titleId: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
};

EmailSenderFormBody.defaultProps = {
  editing: false,
};

const EmailSenderForm = injectIntl(reduxForm({
  form: 'emailSender',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EmailSenderFormBody));

export default EmailSenderForm;
