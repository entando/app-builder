import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, ControlLabel } from 'patternfly-react';
import { formattedText, required, maxLength, isNumber } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

export const maxLength50 = maxLength(50);

export class SettingsFormBody extends Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.onWillMount(this.props.id);
    }
  }

  render() {
    const {
      handleSubmit, invalid, submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="digitalExchange.settings.generalSettings" />
                <div className="WidgetForm__required-fields text-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="name"
              label={
                <FormLabel labelId="app.name" required />
              }
              placeholder={formattedText('app.name')}
              validate={[required, maxLength50]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="url"
              label={
                <FormLabel labelId="digitalExchange.settings.form.url" required />
              }
              placeholder={formattedText('digitalExchange.settings.form.url.placeholder')}
              validate={[required]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="key"
              label={
                <FormLabel labelId="digitalExchange.settings.form.key" />
              }
              placeholder={formattedText('digitalExchange.settings.form.key')}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="secret"
              label={
                <FormLabel labelId="digitalExchange.settings.form.secret" />
              }
              placeholder={formattedText('digitalExchange.settings.form.secret')}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="timeout"
              label={
                <FormLabel labelId="digitalExchange.settings.form.timeout" required />
              }
              validate={[required, isNumber]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={2} className="text-right">
            <ControlLabel>
              <FormLabel labelId="digitalExchange.settings.form.active" />
            </ControlLabel>
          </Col>
          <Col xs={10}>
            <Field
              component={SwitchRenderer}
              name="active"
            />
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
  }
}

SettingsFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  onWillMount: PropTypes.func,
  id: PropTypes.number,
};

SettingsFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  onWillMount: () => {},
  id: null,
};

const SettingsForm = reduxForm({
  form: 'deSettings',
  initialValues: {
    timeout: 5000,
    active: true,
  },
})(SettingsFormBody);

export default SettingsForm;
