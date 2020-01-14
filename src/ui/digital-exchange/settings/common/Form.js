import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, ControlLabel } from 'patternfly-react';
import { required, maxLength, isNumber } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

export const maxLength50 = maxLength(50);

const msgs = defineMessages({
  appName: {
    id: 'app.name',
    defaultMessage: 'Name',
  },
  urlPlaceholder: {
    id: 'digitalExchange.settings.form.url.placeholder',
    defaultMessage: 'URL',
  },
  clientId: {
    id: 'digitalExchange.settings.form.clientId',
    defaultMessage: 'Client ID',
  },
  clientSecret: {
    id: 'digitalExchange.settings.form.clientSecret',
    defaultMessage: 'Client Secret',
  },
});

export class SettingsFormBody extends Component {
  componentWillMount() {
    if (this.props.id) {
      this.props.onWillMount(this.props.id);
    }
  }

  render() {
    const {
      intl, handleSubmit, invalid, submitting,
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
              placeholder={intl.formatMessage(msgs.appName)}
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
              placeholder={intl.formatMessage(msgs.urlPlaceholder)}
              validate={[required]}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="clientId"
              label={
                <FormLabel labelId="digitalExchange.settings.form.clientId" />
              }
              placeholder={intl.formatMessage(msgs.clientId)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="clientSecret"
              label={
                <FormLabel labelId="digitalExchange.settings.form.clientSecret" />
              }
              placeholder={intl.formatMessage(msgs.clientSecret)}
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
  intl: intlShape.isRequired,
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

export default injectIntl(SettingsForm);
