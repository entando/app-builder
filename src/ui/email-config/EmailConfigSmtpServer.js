import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { Button } from 'patternfly-react';
import { required } from '@entando/utils';

import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchInput from 'ui/common/formik-field/SwitchInput';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderRadioInput from 'ui/common/formik-field/RenderRadioInput';

const msgs = defineMessages({
  formLabel: {
    id: 'menu.emailConfig',
    defaultMessage: 'Email Configuration',
  },
});

export const EmailConfigSmtpServerBody = ({
  intl, handleSubmit, onTestConfig, onSendTestEmail, isValid, isSubmitting, values,
}) => {
  const generalSettingsSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.generalSettings" />
      <Field
        component={SwitchInput}
        name="active"
        label={<FormLabel labelId="emailConfig.smtpServer.active" />}
      />
      <Field
        component={SwitchInput}
        name="debugMode"
        label={<FormLabel labelId="emailConfig.smtpServer.debugMode" />}
      />
    </Fragment>
  );

  const connectionSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.connection" />
      <Field
        component={RenderTextInput}
        name="host"
        label={<FormLabel labelId="emailConfig.smtpServer.host" required />}
        validate={required}
      />
      <Field
        component={RenderTextInput}
        name="port"
        label={<FormLabel labelId="emailConfig.smtpServer.port" />}
      />
      <Field
        component={RenderRadioInput}
        name="protocol"
        label={<FormLabel labelId="emailConfig.smtpServer.security" />}
        toggleElement={[
            { id: 'STD', label: <FormattedMessage id="app.enumerator.none" /> },
            { id: 'SSL', label: 'SSL' },
            { id: 'TLS', label: 'TLS' },
          ]}
      />
      <Field
        component={SwitchInput}
        name="checkServerIdentity"
        label={<FormLabel labelId="emailConfig.smtpServer.checkServerIdentity" />}
      />
      <Field
        component={RenderTextInput}
        name="timeout"
        label={<FormLabel labelId="emailConfig.smtpServer.timeout" />}
      />
    </Fragment>
  );

  const authenticationSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.authentication" />
      <Field
        component={RenderTextInput}
        name="username"
        label={<FormLabel labelId="emailConfig.smtpServer.username" />}
      />
      <Field
        component={RenderTextInput}
        name="password"
        label={<FormLabel labelId="emailConfig.smtpServer.password" />}
        type="password"
      />
    </Fragment>
  );

  const btnsDisabled = !isValid || isSubmitting;

  const buttonToolbar = (
    <div>
      <div className="btn-toolbar pull-right">
        <Button
          bsStyle="success"
          disabled={btnsDisabled}
          onClick={() => onTestConfig(values)}
        >
          <FormattedMessage id="emailConfig.smtpServer.testConfig" />
        </Button>
        <Button
          onClick={onSendTestEmail}
          bsStyle="success"
          disabled={btnsDisabled}
        >
          <FormattedMessage id="emailConfig.smtpServer.sendTestEmail" />
        </Button>
        <Button
          type="submit"
          bsStyle="primary"
          disabled={btnsDisabled}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </div>
    </div>
  );

  return (
    <Form aria-label={intl.formatMessage(msgs.formLabel)} onSubmit={handleSubmit} className="form-horizontal">
      <Panel>
        <Panel.Body>
          <FormattedMessage id="emailConfig.smtpServer.panelMsg" />
        </Panel.Body>
      </Panel>
      {generalSettingsSection}
      {connectionSection}
      {authenticationSection}
      {buttonToolbar}
    </Form>
  );
};

EmailConfigSmtpServerBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onTestConfig: PropTypes.func.isRequired,
  onSendTestEmail: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  values: PropTypes.object.isRequired,
};

const EmailConfigSmtpServer = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  validationSchema: () => (
    Yup.object().shape({
      host: Yup.string()
        .required(<FormattedMessage id="validateForm.required" />),
      timeout: Yup.number()
        .typeError(<FormattedMessage id="validateForm.number" />)
        .nullable()
        .integer(<FormattedMessage id="validateForm.number" />),
      port: Yup.number()
        .typeError(<FormattedMessage id="validateForm.number" />)
        .nullable()
        .integer(<FormattedMessage id="validateForm.number" />),
    })),
  handleSubmit: (
    values,
    {
      props: { onSubmit },
      setSubmitting,
    },
  ) => {
    onSubmit(values).then(() => (
      setSubmitting(false)
    ));
  },
  enableReinitialize: true,
  displayName: 'emailConfig',
  keepDirtyOnReinitialize: true,
})(EmailConfigSmtpServerBody);

export default injectIntl(EmailConfigSmtpServer);
