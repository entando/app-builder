import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

export class AppSettingsFormBody extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(data) {
    const { username } = this.props;
    this.props.onSubmit({ username, data });
  }

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.submit)}
        horizontal
        className="AppSettingsForm"
        data-testid="appSettingsForm"
      >
        <FormSectionTitle titleId="user.myProfile.appSettingsSection" />
        <Field
          label={<FormLabel helpId="user.myProfile.wizardToggleHelp" labelId="user.myProfile.wizardToggle" />}
          component={SwitchRenderer}
          data-testid="wizardSwitch"
          name="wizard"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.translationWarningHelp" labelId="user.myProfile.translationWarning" />}
          component={SwitchRenderer}
          data-testid="translationWarningSwitch"
          name="translationWarning"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.loadOnPageSelectHelp" labelId="user.myProfile.loadOnPageSelect" />}
          component={SwitchRenderer}
          data-testid="loadOnPageSelectSwitch"
          name="loadOnPageSelect"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.displayAttributesHelp" labelId="user.myProfile.displayAttributes" />}
          component={SwitchRenderer}
          data-testid="displayAttributesSwitch"
          name="displayAttributes"
        />
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

AppSettingsFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'userPreferences',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AppSettingsFormBody);
