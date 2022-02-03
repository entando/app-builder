import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'patternfly-react';

import PageTitle from 'ui/internal-page/PageTitle';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';

const formSchema = Yup.object().shape({
  code: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />),
  email: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />),
});

const EmailSenderForm = ({
  intl, titleId, editing, initialValues, onSubmit,
}) => (
  <div>
    <PageTitle titleId={titleId} helpId="emailConfig.help" />
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
    >
      {formik => (
        <Form className="form-horizontal" aria-label={intl.formatMessage({ id: titleId })}>
          <Field
            component={RenderTextInput}
            name="code"
            label={<FormLabel labelId="app.code" required />}
            disabled={editing}
          />
          <Field
            component={RenderTextInput}
            name="email"
            label={<FormLabel labelId="emailConfig.senderMgmt.email" required />}
          />
          <Button
            type="submit"
            bsStyle="primary"
            className="pull-right"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </Form>
        )}
    </Formik>
  </div>
);

EmailSenderForm.propTypes = {
  intl: intlShape.isRequired,
  titleId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  initialValues: PropTypes.shape({
    code: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

EmailSenderForm.defaultProps = {
  editing: false,
};

export default injectIntl(EmailSenderForm);
