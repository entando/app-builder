import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Form, Button, FormGroup, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';

export class AppSettingsFormBody extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.onDidMount();
  }

  submit(data) {
    const { username } = this.props;
    this.props.onSubmit({ username, data });
  }

  render() {
    const { selectGroups, selectedJoinGroups } = this.props;

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
          name="wizard"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.translationWarningHelp" labelId="user.myProfile.translationWarning" />}
          component={SwitchRenderer}
          name="translationWarning"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.loadOnPageSelectHelp" labelId="user.myProfile.loadOnPageSelect" />}
          component={SwitchRenderer}
          name="loadOnPageSelect"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.displayAttributesHelp" labelId="user.myProfile.displayAttributes" />}
          component={SwitchRenderer}
          name="displayAttributes"
        />
        <Field
          label={<FormLabel helpId="user.myProfile.defaultOwnerGroupHelp" labelId="user.myProfile.defaultOwnerGroup" />}
          component={RenderSelectInput}
          options={selectGroups}
          name="defaultOwnerGroup"
          defaultOptionId="app.chooseAnOption"
        />
        <FormGroup>
          <Col xs={2} className="text-right">
            <label htmlFor="defaultJoinGroups" className="control-label">
              <FormLabel helpId="user.myProfile.defaultJoinGroupsHelp" labelId="user.myProfile.defaultJoinGroups" />
            </label>
          </Col>
          <Col xs={10}>
            <FieldArray
              component={MultiSelectRenderer}
              name="defaultJoinGroups"
              options={selectGroups}
              selectedValues={selectedJoinGroups}
              labelKey="text"
              valueKey="value"
              emptyOptionTextId="app.chooseAnOption"
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

AppSettingsFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  selectGroups: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.string,
  })).isRequired,
  selectedJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default reduxForm({
  form: 'userPreferences',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AppSettingsFormBody);
