import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Col, Form, FormGroup, Button, ControlLabel } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { isNumber } from '@entando/utils';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const montshSinceLogin = (value, allValues) => (
  (value > allValues.maxMonthsPasswordValid) ?
    <FormattedMessage id="user.restrictions.form.monthsSinceLastLogin.error" /> :
    undefined
);

const msgs = defineMessages({
  months: {
    id: 'user.restrictions.months',
    defaultMessage: 'Months',
  },
});

export class RestrictionsFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { passwordActive: disabled, intl } = this.props;

    return (
      <Form onSubmit={this.props.handleSubmit} horizontal className="UserRestrictionsForm">
        <legend>
          <FormattedMessage id="user.restrictions.passwordSection" />
        </legend>
        <FormGroup controlId="passwordAlwaysActive">
          <Col xs={3}>
            <ControlLabel>
              <FormattedMessage id="user.restrictions.form.active" />
            </ControlLabel>
          </Col>
          <Col xs={9}>
            <Field
              component={SwitchRenderer}
              name="passwordAlwaysActive"
            />
          </Col>
        </FormGroup>
        <Field
          label={<FormattedMessage id="user.restrictions.form.maxMonths" />}
          labelSize={3}
          component={RenderTextInput}
          name="maxMonthsPasswordValid"
          disabled={disabled}
          validate={isNumber}
          alignClass="text-left"
          append={intl.formatMessage(msgs.months)}
        />
        <Field
          label={<FormattedMessage id="user.restrictions.form.monthsSinceLastLogin" />}
          labelSize={3}
          component={RenderTextInput}
          name="lastAccessPasswordExpirationMonths"
          disabled={disabled}
          validate={[isNumber, montshSinceLogin]}
          alignClass="text-left"
          append={intl.formatMessage(msgs.months)}
        />
        <legend>
          <FormattedMessage id="user.restrictions.avatarSection" />
        </legend>
        <FormGroup controlId="enableGravatarIntegration" disabled={false}>
          <Col xs={3}>
            <ControlLabel>
              <FormattedMessage id="user.restrictions.form.gravatar" />
            </ControlLabel>
          </Col>
          <Col xs={9}>
            <Field
              component={SwitchRenderer}
              name="enableGravatarIntegration"
            />
          </Col>
        </FormGroup>
        <Button
          className="pull-right"
          type="submit"
          bsStyle="primary"
        >
          <FormattedMessage id="app.save" />
        </Button>
      </Form>
    );
  }
}

RestrictionsFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
  passwordActive: PropTypes.bool,
};

RestrictionsFormBody.defaultProps = {
  passwordActive: false,
};

const RestrictionsForm = reduxForm({
  form: 'user-restrictions',
})(RestrictionsFormBody);

export default injectIntl(RestrictionsForm);
