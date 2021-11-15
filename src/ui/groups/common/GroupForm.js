import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'patternfly-react';
import { validateCodeField, formatMessageRequired, formatMessageMaxLength } from 'helpers/formikValidations';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const msgs = defineMessages({
  groupName: {
    id: 'group.name',
    defaultMessage: 'Group Name',
  },
  groupCode: {
    id: 'group.code',
    defaultMessage: 'Group Code',
  },
});

export const GroupFormBody = (props) => {
  const {
    intl, isValid, isSubmitting: submitting, mode, submitForm,
    dirty, onCancel, onDiscard, onHideCancelModal, values, onDidMount,
    setFieldValue, setFieldTouched, onWillUnmount,
  } = props;
  useEffect(() => {
    onDidMount(props);
    return () => onWillUnmount();
  }, []);

  const isEdit = mode === EDIT_MODE;

  useEffect(() => {
    if (!isEdit) {
      setFieldValue('code', values.name.replace(/\W/g, '_').toLowerCase());
      setFieldTouched('code', true);
    }
  }, [values.name]);

  const invalid = !isValid;

  const handleCancelClick = () => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  return (
    <Form className="GroupForm form-horizontal" data-testid="group-form">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <div className="GroupForm__required-fields text-right">
              * <FormattedMessage id="app.fieldsRequired" />
              </div>
            </legend>
            <Field
              component={RenderTextInput}
              name="name"
              label={<FormLabel labelId="group.name" helpId="group.name.help" required />}
              placeholder={intl.formatMessage(msgs.groupName)}
            />
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel labelId="group.code" helpId="group.code.help" required />}
              placeholder={intl.formatMessage(msgs.groupCode)}
              disabled={isEdit}
            />
          </fieldset>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={() => {
              onHideCancelModal();
              submitForm();
            }}
            onDiscard={onDiscard}
          />
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
            data-testid="group-form-save"
          >
            <FormattedMessage id="app.save" />
          </Button>
          <Button
            className="pull-right UserForm__action-button"
            bsStyle="default"
            onClick={handleCancelClick}
            data-testid="group-form-cancel"
          >
            <FormattedMessage id="app.cancel" />
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

GroupFormBody.propTypes = {
  intl: intlShape.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  mode: PropTypes.string,
  onDidMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  dirty: PropTypes.bool,
  onHideCancelModal: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
};

GroupFormBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
  mode: NEW_MODE,
  onDidMount: () => {},
  onWillUnmount: () => {},
  dirty: false,
};

const GroupForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  mapPropsToErrors: ({ mode }) => {
    switch (mode) {
      default:
      case NEW_MODE:
        return { name: '', code: '' };
      case EDIT_MODE:
        return {};
    }
  },
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      name: Yup.string()
        .required(intl.formatMessage(formatMessageRequired))
        .max(50, intl.formatMessage(formatMessageMaxLength, { max: 50 })),
      code: Yup.string()
        .required(intl.formatMessage(formatMessageRequired))
        .max(20, intl.formatMessage(formatMessageMaxLength, { max: 20 }))
        .test(
          'validateCodeField',
          validateCodeField(intl),
        ),
    })
  ),
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'groupForm',
})(GroupFormBody);

export default injectIntl(GroupForm);
