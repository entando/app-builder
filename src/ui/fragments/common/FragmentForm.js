import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col, Alert } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { formattedText, required, code, maxLength } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const maxLength50 = maxLength(50);

export const renderDefaultGuiCodeField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="app.alert.notAvaible" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre>{input.value}</pre></Panel.Body>
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

export const FragmentFormBody = (props) => {
  const {
    handleSubmit, invalid, submitting, mode,
  } = props;

  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
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

  if (mode === NEW_MODE) {
    pluginField = null;
    widgetTypeField = null;
  }

  return (
    <form onSubmit={onSubmit} className="form-horizontal">
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
                <span>
                  <FormattedMessage id="app.code" />
                  <i className="fa fa-asterisk required-icon FragmentForm__required-icon" />
                </span>
              }
              placeholder={formattedText('fragment.code.placeholder')}
              validate={[required, code, maxLength50]}
              disabled={mode === EDIT_MODE}
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
                  <Tab eventKey={1} title={formattedText('fragment.tab.guiCode')} >
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
                  <Tab eventKey={2} title={formattedText('fragment.tab.defaultGuiCode')} >
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
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            disabled={invalid || submitting}
          >
            <FormattedMessage id="app.save" />
          </Button>
        </Col>
      </Row>
    </form>
  );
};

FragmentFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

FragmentFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
};

const FragmentForm = reduxForm({
  form: 'fragment',
})(FragmentFormBody);

export default FragmentForm;
