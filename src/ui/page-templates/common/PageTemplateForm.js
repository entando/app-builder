import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import * as Yup from 'yup';

import { convertPageTemplateForm, getCellMap } from 'state/page-templates/selectors';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import JsonCodeEditorRenderer from 'ui/common/form/JsonCodeEditorRenderer';
import HtmlCodeEditorRenderer from 'ui/common/form/HtmlCodeEditorRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import PageConfigGrid from 'ui/pages/config/PageConfigGrid';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

import {
  FORM_MODE_ADD, FORM_MODE_EDIT, FORM_MODE_CLONE,
  REGULAR_SAVE_TYPE, CONTINUE_SAVE_TYPE,
} from 'state/page-templates/const';

export const validateJson = (value) => {
  try {
    JSON.parse(value);
    return undefined;
  } catch (e) {
    return `Invalid JSON format: ${e.message}`;
  }
};

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

export class PageTemplateFormBody extends Component {
  constructor(props) {
    super(props);
    this.formShape = null;
    this.state = {
      cellMap: getCellMap(convertPageTemplateForm({
        code: '',
        descr: '',
        configuration: '{\n  "frames": []\n}',
        template: '',
      })),
    };
    this.validatePreviewErrors = this.validatePreviewErrors.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }

  componentDidMount() {
    const { onWillMount, intl } = this.props;
    if (onWillMount) {
      onWillMount(this.props);
    }

    this.formShape = Yup.object().shape({
      code: Yup.string()
        .required(intl.formatMessage(msgs.required))
        .max(40, intl.formatMessage(msgs.maxLength, { max: 40 })),
      descr: Yup.string()
        .required(intl.formatMessage(msgs.required))
        .max(50, intl.formatMessage(msgs.maxLength, { max: 50 })),
      configuration: Yup.string()
        .required(intl.formatMessage(msgs.required))
        .test('validateJson', (value, { createError, path }) => {
          try {
            JSON.parse(value);
            return true;
          } catch (e) {
            return createError({
              message: `Invalid JSON format: ${e.message}`,
              path,
            });
          }
        })
        .test({
          name: 'validatePreviewErrors',
          test: this.validatePreviewErrors,
        }),
      template: Yup.string().required(intl.formatMessage(msgs.required)),
    });
  }

  validatePreviewErrors(value, { createError, path }) {
    const { intl, previewErrors } = this.props;
    if (previewErrors.length) {
      const errors = previewErrors.map(({ id, values }) => {
        const errMsgs = defineMessages({
          err: { id },
        });
        return intl.formatMessage(errMsgs.err, values);
        // return <div key={message}>{message}</div>;
      });
      return createError({
        message: errors.join(', '),
        path,
      });
    }
    return true;
  }

  handleSubmitButtonClick(formikProps, submitType) {
    const { onSubmit } = this.props;
    const { values, setSubmitting, submitForm } = formikProps;
    submitForm();
    onSubmit(values, submitType);
    setSubmitting(false);
  }

  render() {
    const {
      intl, mode, previewErrors,
      onCancel, onDiscard, onHideCancelModal, initialValues,
    } = this.props;

    const isEditMode = mode === FORM_MODE_EDIT;

    return (
      <Formik
        enableReinitialize
        validationSchema={this.formShape}
        initialValues={initialValues}
        initialTouched={isEditMode ? {
          descr: true, configuration: true, template: true,
        } : {}}
      >
        {(formikProps) => {
          const {
            values,
            dirty,
            isSubmitting: submitting,
            isValid,
          } = formikProps;

          useEffect(() => {
            const cellMap = getCellMap(convertPageTemplateForm(values));
            this.setState({ cellMap });
          }, [values]);

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
                      previewErrors={previewErrors}
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
                  <PageConfigGrid cellMap={this.state.cellMap} />
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
                        onClick={() => this.handleSubmitButtonClick(formikProps, REGULAR_SAVE_TYPE)}
                      >
                        <FormattedMessage id="app.save" />
                      </MenuItem>
                      <MenuItem
                        id="continueSaveButton"
                        eventKey={CONTINUE_SAVE_TYPE}
                        disabled={invalid || submitting}
                        onClick={() => this.handleSubmitButtonClick(formikProps, CONTINUE_SAVE_TYPE)}
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
                        this.handleSubmitButtonClick(formikProps);
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
  }
}

PageTemplateFormBody.propTypes = {
  intl: intlShape.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  mode: PropTypes.oneOf([FORM_MODE_ADD, FORM_MODE_CLONE, FORM_MODE_EDIT]),
  onWillMount: PropTypes.func,
  previewErrors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape({}),
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHideCancelModal: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PageTemplateFormBody.defaultProps = {
  mode: FORM_MODE_ADD,
  onWillMount: null,
};

export default injectIntl(PageTemplateFormBody);
