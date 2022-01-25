import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import { validateCodeField } from 'helpers/formikValidations';
import FormLabel from 'ui/common/form/FormLabel';
import PermissionGrid from 'ui/roles/common/PermissionGrid';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { TEST_ID_ROLE_FORM } from 'ui/test-const/role-test-const';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const msgs = defineMessages({
  appName: {
    id: 'app.name',
    defaultMessage: 'Name',
  },
  appCode: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
});

export const RoleFormBody = ({
  onWillMount,
  submitForm,
  permissions,
  onDiscard,
  onCancel,
  intl,
  dirty,
  isValid,
  mode,
  loading,
  roleCode,
  isSubmitting,
  values,
  setFieldValue,
  handleChange,
}) => {
  const invalid = !isValid;
  const isEdit = mode === EDIT_MODE;
  const superuserToggled = values.permissions ? values.permissions.superuser : false;

  useEffect(() => {
    onWillMount(roleCode);
  }, [roleCode, onWillMount]);

  const handleCancelClick = () => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  const onToggleSuperuser = useCallback(() => {
    if (!superuserToggled) {
      permissions.forEach((permission) => {
        if (permission.code !== 'superuser') {
          setFieldValue(`permissions.${permission.code}`, false);
        }
      });
    }
  }, [superuserToggled, permissions, setFieldValue]);

  const onChangeName = useCallback((e) => {
    handleChange(e);
    if (mode === NEW_MODE) {
      setFieldValue('code', e.target.value.replace(/\W/g, '_').toLowerCase());
    }
  }, [handleChange, mode, setFieldValue]);

  return (
    <Form className="RoleForm form-horizontal">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <div className="RoleForm__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
              </div>
            </legend>
            <Field
              component={RenderTextInput}
              name="name"
              label={<FormLabel labelId="app.name" helpId="role.name.help" required />}
              placeholder={intl.formatMessage(msgs.appName)}
              onKeyUp={onChangeName}
              restProps={{
                onChange: onChangeName,
              }}
            />
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel labelId="app.code" helpId="role.code.help" required />}
              placeholder={intl.formatMessage(msgs.appCode)}
              disabled={isEdit}
            />
          </fieldset>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <div className="RoleForm__permissions">
                <FormattedMessage id="app.permissions" />
              </div>
            </legend>
            <PermissionGrid
              permissions={permissions}
              loading={loading}
              onToggleSuperuser={onToggleSuperuser}
              superuserToggled={superuserToggled}
            />
          </fieldset>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
            invalid={invalid}
            submitting={isSubmitting}
            onSave={submitForm}
            onDiscard={onDiscard}
          />
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            data-testid={TEST_ID_ROLE_FORM.SAVE_BUTTON}
            disabled={invalid || isSubmitting}
          >
            <FormattedMessage id="app.save" />
          </Button>
          <Button
            className="pull-right UserForm__action-button"
            bsStyle="default"
            data-testid={TEST_ID_ROLE_FORM.CANCEL_BUTTON}
            onClick={handleCancelClick}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

RoleFormBody.propTypes = {
  intl: intlShape.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  mode: PropTypes.string,
  onWillMount: PropTypes.func,
  permissions: PropTypes.arrayOf(PropTypes.shape({
    descr: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  roleCode: PropTypes.string,
  values: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    permissions: PropTypes.shape({
      superuser: PropTypes.bool,
    }),
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

RoleFormBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
  mode: NEW_MODE,
  onWillMount: null,
  permissions: [],
  loading: false,
  dirty: false,
  roleCode: null,
};

const RoleForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      name: Yup.string()
        .required(<FormattedMessage id="validateForm.required" />)
        .max(50, <FormattedMessage id="validateForm.maxLength" values={{ max: 80 }} />),
      code: Yup.string()
        .required(<FormattedMessage id="validateForm.required" />)
        .max(20, <FormattedMessage id="validateForm.maxLength" values={{ max: 20 }} />)
        .test('validateCodeField', validateCodeField(intl)),
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
  displayName: 'role',
})(RoleFormBody);

export default injectIntl(RoleForm);
