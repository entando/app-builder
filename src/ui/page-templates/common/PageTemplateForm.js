import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import * as Yup from 'yup';

import { validateJson, formatMessageRequired, formatMessageMaxLength } from 'helpers/formikValidations';
import { convertPageTemplateForm, getCellMap, validateFrames } from 'state/page-templates/helpers';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import JsonCodeEditorRenderer from 'ui/common/formik-field/JsonCodeEditorRenderer';
import HtmlCodeEditorRenderer from 'ui/common/formik-field/HtmlCodeEditorRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

import {
  FORM_MODE_ADD, FORM_MODE_EDIT, FORM_MODE_CLONE,
  REGULAR_SAVE_TYPE, CONTINUE_SAVE_TYPE,
} from 'state/page-templates/const';

const msgs = defineMessages({
  appCode: {
    id: 'app.code',
    defaultMessage: 'Code',
  },
  appName: {
    id: 'app.name',
    defaultMessage: 'Name',
  },
  pageConfig: {
    id: 'pageTemplates.jsonConfiguration',
    defaultMessage: 'JSON Configuration',
  },
  pageTemplate: {
    id: 'pageTemplates.template',
    defaultMessage: 'Template',
  },
  maxLength: {
    id: 'validateForm.maxLength',
    deaultMessage: 'Maximum of {max} characters only.',
  },
  required: {
    id: 'validateForm.required',
    defaultMessage: 'Required',
  },
});

const PageTemplateFormBody = ({
  intl,
  values,
  dirty,
  isSubmitting: submitting,
  isValid,
  setSubmitting,
  submitForm,
  resetForm,
  mode,
  onDidMount,
  onWillUnmount,
  onSubmit,
  onCancel,
  onDiscard,
  onHideCancelModal,
}) => {
  useEffect(() => {
    onDidMount();
    return () => onWillUnmount();
  }, []);

  const handleSubmit = (submitType) => {
    submitForm();
    onSubmit(values, submitType).then((res) => {
      setSubmitting(false);
      if (!res && submitType !== CONTINUE_SAVE_TYPE) {
        resetForm();
      }
    });
  };

  const handleCancelClick = () => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  const isEditMode = mode === FORM_MODE_EDIT;
  const invalid = !isValid;

  return (
    <Form className="PageTemplateForm form-horizontal">
      <Row>
        <Col xs={12}>
          <fieldset>
            <Field
              component={RenderTextInput}
              name="code"
              label={<FormLabel labelId="app.code" helpId="pageTemplates.code.help" required />}
              placeholder={intl.formatMessage(msgs.appCode)}
              disabled={isEditMode}
            />
          </fieldset>
          <fieldset>
            <Field
              component={RenderTextInput}
              name="descr"
              label={<FormLabel labelId="app.name" helpId="pageTemplates.name.help" required />}
              placeholder={intl.formatMessage(msgs.appName)}
            />
          </fieldset>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Field
              component={JsonCodeEditorRenderer}
              name="configuration"
              label={<FormLabel labelId="pageTemplates.jsonConfiguration" required />}
              placeholder={intl.formatMessage(msgs.pageConfig)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Field
              component={HtmlCodeEditorRenderer}
              name="template"
              label={<FormLabel labelId="pageTemplates.template" required />}
              placeholder={intl.formatMessage(msgs.pageTemplate)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <label className="col-xs-2 control-label">
          <FormattedMessage id="pageTemplates.templatePreview" />
        </label>
        <Col xs={10}>
          <PageConfigGrid cellMap={getCellMap(convertPageTemplateForm(values))} />
        </Col>
      </Row>
      <Row>
        <br />
        <Col xs={12}>
          <div className="btn-toolbar pull-right FragmentForm__dropdown">
            <Button
              className="pull-right UserForm__action-button"
              bsStyle="default"
              onClick={handleCancelClick}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
            <DropdownButton
              title={intl.formatMessage({ id: 'app.save' })}
              bsStyle="primary"
              id="saveopts"
              className="FragmentForm__saveDropdown"
            >
              <MenuItem
                id="regularSaveButton"
                eventKey={REGULAR_SAVE_TYPE}
                disabled={invalid || submitting}
                onClick={() => handleSubmit(REGULAR_SAVE_TYPE)}
              >
                <FormattedMessage id="app.save" />
              </MenuItem>
              <MenuItem
                id="continueSaveButton"
                eventKey={CONTINUE_SAVE_TYPE}
                disabled={invalid || submitting}
                onClick={() => (
                  handleSubmit(CONTINUE_SAVE_TYPE)
                )}
              >
                <FormattedMessage id="app.saveAndContinue" />
              </MenuItem>
            </DropdownButton>
            <ConfirmCancelModalContainer
              contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
              invalid={invalid}
              submitting={submitting}
              onSave={() => {
                onHideCancelModal();
                handleSubmit(REGULAR_SAVE_TYPE);
              }}
              onDiscard={onDiscard}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
};

PageTemplateFormBody.propTypes = {
  intl: intlShape.isRequired,
  values: PropTypes.shape({}).isRequired,
  mode: PropTypes.oneOf([FORM_MODE_ADD, FORM_MODE_CLONE, FORM_MODE_EDIT]),
  dirty: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onDidMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onHideCancelModal: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
};

PageTemplateFormBody.defaultProps = {
  mode: FORM_MODE_ADD,
  dirty: false,
  isValid: false,
  isSubmitting: false,
  onDidMount: null,
  onWillUnmount: null,
};

const PageTemplateForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  isInitialValid: ({ mode }) => mode === FORM_MODE_EDIT,
  mapPropsToErrors: ({ mode }) => {
    switch (mode) {
      default:
      case FORM_MODE_ADD:
        return { code: '', descr: '', template: '' };
      case FORM_MODE_CLONE:
        return { code: '' };
      case FORM_MODE_EDIT:
        return {};
    }
  },
  validationSchema: ({ intl }) => (
    Yup.object().shape({
      code: Yup.string()
        .required(intl.formatMessage(formatMessageRequired))
        .max(40, intl.formatMessage(formatMessageMaxLength, { max: 40 })),
      descr: Yup.string()
        .required(intl.formatMessage(formatMessageRequired))
        .max(50, intl.formatMessage(formatMessageMaxLength, { max: 50 })),
      configuration: Yup.string()
        .required(intl.formatMessage(formatMessageRequired))
        .test('validateJSONPreviewErrors', (value, yupProps) => {
          const { createError, path } = yupProps;
          const jsonTest = validateJson(intl)(value, yupProps);
          if (jsonTest !== true) {
            return jsonTest;
          }
          const previewErrors = validateFrames(JSON.parse(value).frames);
          if (previewErrors.length) {
            const errors = previewErrors.map(({ id, values }) => {
              const errMsgs = defineMessages({
                err: { id },
              });
              return intl.formatMessage(errMsgs.err, values);
            });
            return createError({
              message: errors.join('; '),
              path,
            });
          }
          return true;
        }),
      template: Yup.string()
        .required(intl.formatMessage(formatMessageRequired)),
    })
  ),
  handleSubmit: () => {},
  displayName: 'pageTemplateForm',
})(PageTemplateFormBody);

export default injectIntl(PageTemplateForm);
