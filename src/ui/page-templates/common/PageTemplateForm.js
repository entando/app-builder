import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import * as Yup from 'yup';

import { validateJson } from 'helpers/formikValidations';
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

const PageTemplateForm = ({
  intl,
  initialValues,
  mode,
  onDidMount,
  onSubmit,
  onCancel,
  onDiscard,
  onHideCancelModal,
}) => {
  useEffect(() => {
    onDidMount();
  }, []);

  const validateJSONPreviewErrors = (value, yupProps) => {
    const { createError, path } = yupProps;
    const jsonTest = validateJson(value, yupProps);
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
  };

  const formShape = Yup.object().shape({
    code: Yup.string()
      .required(intl.formatMessage(msgs.required))
      .max(40, intl.formatMessage(msgs.maxLength, { max: 40 })),
    descr: Yup.string()
      .required(intl.formatMessage(msgs.required))
      .max(50, intl.formatMessage(msgs.maxLength, { max: 50 })),
    configuration: Yup.string()
      .required(intl.formatMessage(msgs.required))
      .test('validateJSONPreviewErrors', validateJSONPreviewErrors),
    template: Yup.string()
      .required(intl.formatMessage(msgs.required)),
  });

  const handleSubmit = (formikProps, submitType) => {
    const {
      values,
      setSubmitting,
      submitForm,
      resetForm,
    } = formikProps;
    submitForm();
    onSubmit(values, submitType).then((res) => {
      setSubmitting(false);
      if (!res && submitType !== CONTINUE_SAVE_TYPE) {
        resetForm();
      }
    });
  };

  const isEditMode = mode === FORM_MODE_EDIT;

  return (
    <Formik
      enableReinitialize
      validationSchema={formShape}
      initialValues={initialValues}
      initialTouched={isEditMode ? {
        descr: true, configuration: true, template: true,
      } : {}}
      onSubmit={() => {}}
    >
      {(formikProps) => {
        const {
          values,
          dirty,
          isSubmitting: submitting,
          isValid,
        } = formikProps;

        const invalid = !isValid;

        const handleCancelClick = () => {
          if (dirty) {
            onCancel();
          } else {
            onDiscard();
          }
        };

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
                      disabled={(!isEditMode && !dirty) || invalid || submitting}
                      onClick={() => handleSubmit(formikProps, REGULAR_SAVE_TYPE)}
                    >
                      <FormattedMessage id="app.save" />
                    </MenuItem>
                    <MenuItem
                      id="continueSaveButton"
                      eventKey={CONTINUE_SAVE_TYPE}
                      disabled={(!isEditMode && !dirty) || invalid || submitting}
                      onClick={() => (
                        handleSubmit(formikProps, CONTINUE_SAVE_TYPE)
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
                      handleSubmit(formikProps);
                    }}
                    onDiscard={onDiscard}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

PageTemplateForm.propTypes = {
  intl: intlShape.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  mode: PropTypes.oneOf([FORM_MODE_ADD, FORM_MODE_CLONE, FORM_MODE_EDIT]),
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onHideCancelModal: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PageTemplateForm.defaultProps = {
  mode: FORM_MODE_ADD,
  onDidMount: null,
};

export default injectIntl(PageTemplateForm);
