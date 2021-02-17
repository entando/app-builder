import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { required, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

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


const maxLength50 = maxLength(50);
const maxLength40 = maxLength(40);

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
});

export class PageTemplateFormBody extends Component {
  constructor(props) {
    super(props);
    this.validatePreviewErrors = this.validatePreviewErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  validatePreviewErrors(value, allValues, formProps) {
    const { intl } = this.props;
    if (formProps.previewErrors.length) {
      return formProps.previewErrors.map(({ id, values }) => {
        const errMsgs = defineMessages({
          err: { id },
        });
        const message = intl.formatMessage(errMsgs.err, values);
        return <div key={message}>{message}</div>;
      });
    }
    return undefined;
  }

  render() {
    const {
      intl, handleSubmit, invalid, submitting, mode, previewCellMap, previewErrors,
      onSubmit, dirty, onCancel, onDiscard, onSave,
    } = this.props;

    const isEditMode = mode === FORM_MODE_EDIT;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <form className="PageTemplateForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="code"
                label={<FormLabel labelId="app.code" helpId="pageTemplates.code.help" required />}
                placeholder={intl.formatMessage(msgs.appCode)}
                validate={[required, maxLength40]}
                disabled={isEditMode}
              />
            </fieldset>
            <fieldset>
              <Field
                component={RenderTextInput}
                name="descr"
                label={<FormLabel labelId="app.name" helpId="pageTemplates.name.help" required />}
                placeholder={intl.formatMessage(msgs.appName)}
                validate={[required, maxLength50]}
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
                validate={[required, validateJson, this.validatePreviewErrors]}
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
                validate={[required]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <label className="col-xs-2 control-label">
            <FormattedMessage id="pageTemplates.templatePreview" />
          </label>
          <Col xs={10}>
            <PageConfigGrid cellMap={previewCellMap} />
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
                  onClick={handleSubmit(values => onSubmit({
                  ...values,
                }, REGULAR_SAVE_TYPE))}
                >
                  <FormattedMessage id="app.save" />
                </MenuItem>
                <MenuItem
                  id="continueSaveButton"
                  eventKey={CONTINUE_SAVE_TYPE}
                  disabled={invalid || submitting}
                  onClick={handleSubmit(values => onSubmit({
                  ...values,
                }, CONTINUE_SAVE_TYPE))}
                >
                  <FormattedMessage id="app.saveAndContinue" />
                </MenuItem>
              </DropdownButton>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={invalid}
                submitting={submitting}
                onSave={onSave}
                onDiscard={onDiscard}
              />
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

PageTemplateFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf([FORM_MODE_ADD, FORM_MODE_CLONE, FORM_MODE_EDIT]),
  onWillMount: PropTypes.func,
  previewCellMap: PropTypes.shape({}),
  previewErrors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    values: PropTypes.shape({}),
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PageTemplateFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: FORM_MODE_ADD,
  onWillMount: null,
  previewCellMap: null,
  dirty: false,
};

const PageTemplateForm = reduxForm({
  form: 'pageTemplate',
})(PageTemplateFormBody);

export default injectIntl(PageTemplateForm);
