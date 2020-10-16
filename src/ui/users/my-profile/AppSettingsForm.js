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

  componentDidMount() {
    this.props.onDidMount(this.props);
  }

  submit(data) {
    const { username } = this.props;
    const { wizardEnabled } = data;
    this.props.onSubmit({ wizardEnabled: wizardEnabled || false, username });
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
          name="wizardEnabled"
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
  onDidMount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'myprofile-appsettings',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AppSettingsFormBody);
