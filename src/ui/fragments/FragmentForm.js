import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { required } from 'util/validateForm';
import RenderTextInput from 'ui/form/RenderTextInput';

const NEW_MODE = 'new';

export const renderStaticField = (field) => {
  const { input, label, name } = field;
  if (!input.value) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label col-sm-2">
        {label}
      </label>
      <Col sm={10}>
        {input.value.title}
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
      label={<FormattedMessage id="fragment.edit.widgetType" />}
    />
  );

  let pluginField = (
    <Field
      name="plugin"
      component={renderStaticField}
      label={<FormattedMessage id="fragment.edit.plugin" />}
    />
  );

  if (mode === NEW_MODE) {
    pluginField = null;
    widgetTypeField = null;
  }

  return (
    <form onSubmit={onSubmit} className="form-horizontal">
      <Row>
        <Col xs={12} >
          <fieldset className="no-padding" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <Field
              component={RenderTextInput}
              name="code"
              label={
                <span>
                  <FormattedMessage id="fragment.create.code" />
                  <i className="fa fa-asterisk required-icon FragmentForm__required-icon" />
                </span>
              }
              placeholder={formattedText('fragment.create.code.placeholder')}
              validate={[required]}
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
                    <div className="tab-content margin-large-bottom ">
                      <div className="tab-pane fade in active">
                        <div className="margin-none alert alert-info">
                          <FormattedMessage id="fragment.body.defaultGuiCode" />
                        </div>
                      </div>
                    </div>
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
