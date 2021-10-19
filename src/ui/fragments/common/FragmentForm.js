import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col, Alert, DropdownButton, MenuItem } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { required, maxLength } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import {
  REGULAR_SAVE_TYPE,
  CONTINUE_SAVE_TYPE,
  FORM_MODE_ADD,
  FORM_MODE_EDIT,
  FORM_MODE_CLONE,
} from 'state/fragments/const';

const maxLength50 = maxLength(50);

const fragmentCode = value => (
  value && /^[0-9a-zA-Z_\-.]+$/i.test(value) ?
    undefined :
    <FormattedMessage
      id="validateForm.fragmentCode"
    />
);


export const renderDefaultGuiCodeField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="app.alert.notAvailable" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre className="PageTemplateDetailTable__template">{input.value}</pre></Panel.Body>
    </Panel>
  );
};

const defaultGuiCodeField = (
  <Field
    name="defaultGuiCode"
    component={renderDefaultGuiCodeField}
  />
);

export const renderStaticField = (field) => {
  const { input, label, name } = field;
  const fieldValue = (input.value.title) ? input.value.title : input.value.code;
  if (!input.value || fieldValue === null) {
    return null;
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        {fieldValue}
      </Col>
    </div>
  );
};

const msgs = defineMessages({
  codePlaceholder: {
    id: 'fragment.code.placeholder',
    defaultMessage: 'Code',
  },
  guiCode: {
    id: 'fragment.tab.guiCode',
    defaultMessage: 'GUI Code',
  },
  defaultGuiCode: {
    id: 'fragment.tab.defaultGuiCode',
    defaultMessage: 'Default GUI Code',
  },
});

export const FragmentFormBody = (props) => {
  const {
    intl, handleSubmit, invalid, submitting, mode,
    dirty, onCancel, onDiscard, onSave, onSubmit,
  } = props;

  const handleCancelClick = () => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  let widgetTypeField = (
    <Field
      name="widgetType"
      component={renderStaticField}
      label={<FormattedMessage id="fragment.form.edit.widgetType" />}
    />
  );

  let pluginField = (
    <Field
      name="pluginCode"
      component={renderStaticField}
      label={<FormattedMessage id="fragment.form.edit.plugin" />}
    />
  );

  if ([FORM_MODE_ADD, FORM_MODE_CLONE].includes(mode)) {
    pluginField = null;
    widgetTypeField = null;
  }

  return (
    <form className="form-horizontal">
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.info" />
              <div className="WidgetForm__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
              </div>
            </legend>
            <Field
              component={RenderTextInput}
              name="code"
              label={
                <FormLabel labelId="app.code" helpId="app.help.code" required />
              }
              placeholder={intl.formatMessage(msgs.codePlaceholder)}
              validate={[required, fragmentCode, maxLength50]}
              disabled={mode === FORM_MODE_EDIT}
            />
            {widgetTypeField}
            {pluginField}
          </fieldset>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <div className="form-group">
              <span className="control-label col-xs-2" />
              <Col xs={10}>
                <Tabs id="basic-tabs" defaultActiveKey={1}>
                  <Tab eventKey={1} title={intl.formatMessage(msgs.guiCode)} >
                    <div className="tab-content margin-large-bottom ">
                      <div className="tab-pane fade in active">
                        <Field
                          name="guiCode"
                          component="textarea"
                          cols="50"
                          rows="8"
                          className="form-control"
                          validate={[required]}
                        />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title={intl.formatMessage(msgs.defaultGuiCode)} >
                    {defaultGuiCodeField}
                  </Tab>
                </Tabs>
              </Col>
            </div>
          </fieldset>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <div className="FragmentForm__dropdown">
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
          </div>
          <Button
            className="pull-right"
            bsStyle="default"
            onClick={handleCancelClick}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <ConfirmCancelModalContainer
            contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
            invalid={invalid}
            submitting={submitting}
            onSave={onSave}
            onDiscard={onDiscard}
          />
        </Col>
      </Row>
    </form>
  );
};

FragmentFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.oneOf([FORM_MODE_ADD, FORM_MODE_CLONE, FORM_MODE_EDIT]),
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FragmentFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: FORM_MODE_ADD,
  dirty: false,
};

const FragmentForm = reduxForm({
  form: 'fragment',
})(FragmentFormBody);

export default injectIntl(FragmentForm);
