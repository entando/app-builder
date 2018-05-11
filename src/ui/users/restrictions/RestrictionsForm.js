import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Col, Form, FormGroup } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';

class RestrictionsForm extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    return (
      <Form horizontal className="UserRestrictionsForm">
        <legend>
          <FormattedMessage id="user.restrictions.passwordSection" />
        </legend>
        <FormGroup controlId="restrictionsActive" disabled={false}>
          <Col sm={3}>
            <FormattedMessage id="user.restrictions.form.active" />
          </Col>
          <Col sm={9}>
            <Field
              component={SwitchRenderer}
              name="restrictionsActive"
            />
          </Col>
        </FormGroup>
        <legend>
          <FormattedMessage id="user.restrictions.avatarSection" />
        </legend>
        <FormGroup controlId="enableGravatarIntegration" disabled={false}>
          <Col sm={3}>
            <FormattedMessage id="user.restrictions.form.gravatar" />
          </Col>
          <Col sm={9}>
            <Field
              component={SwitchRenderer}
              name="enableGravatarIntegration"
            />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

RestrictionsForm.propTypes = {
  onWillMount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'user-restrictions',
})(RestrictionsForm);
