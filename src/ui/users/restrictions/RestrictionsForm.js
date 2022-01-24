import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import SwitchInput from 'ui/common/formik-field/SwitchInput';

export const montshSinceLogin = (value, allValues) => (
  (value > allValues.maxMonthsPasswordValid) ?
    <FormattedMessage id="user.restrictions.form.monthsSinceLastLogin.error" /> :
    undefined
);

const msgs = defineMessages({
  months: {
    id: 'user.restrictions.months',
    defaultMessage: 'Months',
  },
});

const formSchema = Yup.object().shape({
  enableGravatarIntegration: Yup.bool(),
  passwordAlwaysActive: Yup.bool(),
  restrictionsActive: Yup.bool(),
  maxMonthsPasswordValid: Yup.number()
    .nullable()
    .integer(<FormattedMessage id="validateForm.number" />),
  lastAccessPasswordExpirationMonths: Yup.number()
    .nullable()
    .integer(<FormattedMessage id="validateForm.number" />)
    .max(Yup.ref('maxMonthsPasswordValid'), <FormattedMessage id="user.restrictions.form.monthsSinceLastLogin.error" />),
});

const RestrictionsForm = ({
  loading, onMount, intl, initialValues, onSubmit,
}) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Spinner loading={!!loading}>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
        validateOnMount
        enableReinitialize
      >
        {formik => (
          <Form className="UserRestrictionsForm form-horizontal" aria-label="User Restrictions Form">
            <legend>
              <FormattedMessage id="user.restrictions.passwordSection" />
            </legend>
            <Field
              component={SwitchInput}
              name="passwordAlwaysActive"
              label={<FormLabel labelId="user.restrictions.form.active" />}
              labelSize={3}
              alignClass="text-left"
            />
            <Field
              label={<FormattedMessage id="user.restrictions.form.maxMonths" />}
              labelSize={3}
              component={RenderTextInput}
              name="maxMonthsPasswordValid"
              disabled={formik.values.passwordAlwaysActive}
              alignClass="text-left"
              append={intl.formatMessage(msgs.months)}
            />
            <Field
              label={<FormattedMessage id="user.restrictions.form.monthsSinceLastLogin" />}
              labelSize={3}
              component={RenderTextInput}
              name="lastAccessPasswordExpirationMonths"
              disabled={formik.values.passwordAlwaysActive}
              alignClass="text-left"
              append={intl.formatMessage(msgs.months)}
            />
            <legend>
              <FormattedMessage id="user.restrictions.avatarSection" />
            </legend>
            <Field
              component={SwitchInput}
              name="enableGravatarIntegration"
              label={<FormLabel labelId="user.restrictions.form.gravatar" />}
              labelSize={3}
              alignClass="text-left"
            />
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={!formik.isValid}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Form>
        )}
      </Formik>
    </Spinner>
  );
};

RestrictionsForm.propTypes = {
  intl: intlShape.isRequired,
  onMount: PropTypes.func,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    enableGravatarIntegration: PropTypes.bool,
    lastAccessPasswordExpirationMonths: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxMonthsPasswordValid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    passwordAlwaysActive: PropTypes.bool,
  }).isRequired,
};

RestrictionsForm.defaultProps = {
  onMount: () => {},
  loading: false,
};

export default injectIntl(RestrictionsForm);
