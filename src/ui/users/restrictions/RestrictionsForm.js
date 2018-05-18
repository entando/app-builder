import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Col, Form, FormGroup, Button, ControlLabel } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { isNumber } from '@entando/utils';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const montshSinceLogin = (value, allValues) => (
  (value > allValues.maxMonthsPasswordValid) ?
    <FormattedMessage id="user.restrictions.form.monthsSinceLastLogin.error" /> :
    undefined
);

export class RestrictionsFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const disabled = this.props.passwordActive;

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
          append={<FormattedMessage id="user.restrictions.months" />}
        />
        <Field
          label={<FormattedMessage id="user.restrictions.form.monthsSinceLastLogin" />}
          labelSize={3}
          component={RenderTextInput}
          name="lastAccessPasswordExpirationMonths"
          disabled={disabled}
          validate={[isNumber, montshSinceLogin]}
          append={<FormattedMessage id="user.restrictions.months" />}
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
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
  passwordActive: PropTypes.bool,
};

RestrictionsFormBody.defaultProps = {
  passwordActive: false,
};

export default reduxForm({
  form: 'user-restrictions',
})(RestrictionsFormBody);
