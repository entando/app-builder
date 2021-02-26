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
    const {
      selectGroups, defaultPageJoinGroups, defaultContentJoinGroups,
    } = this.props;

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
          label={<FormLabel helpId="user.myProfile.defaultPageOwnerGroupHelp" labelId="user.myProfile.defaultPageOwnerGroup" />}
          component={RenderSelectInput}
          options={selectGroups}
          name="defaultPageOwnerGroup"
          defaultOptionId="app.chooseAnOption"
        />
        <FormGroup>
          <Col xs={2} className="text-right">
            <label htmlFor="defaultPageJoinGroups" className="control-label">
              <FormLabel helpId="user.myProfile.defaultPageJoinGroupsHelp" labelId="user.myProfile.defaultPageJoinGroups" />
            </label>
          </Col>
          <Col xs={10}>
            <FieldArray
              component={MultiSelectRenderer}
              name="defaultPageJoinGroups"
              options={selectGroups}
              selectedValues={defaultPageJoinGroups}
              labelKey="text"
              valueKey="value"
              emptyOptionTextId="app.chooseAnOption"
            />
          </Col>
        </FormGroup>
        <Field
          label={<FormLabel helpId="user.myProfile.defaultContentOwnerGroupHelp" labelId="user.myProfile.defaultContentOwnerGroup" />}
          component={RenderSelectInput}
          options={selectGroups}
          name="defaultContentOwnerGroup"
          defaultOptionId="app.chooseAnOption"
        />
        <FormGroup>
          <Col xs={2} className="text-right">
            <label htmlFor="defaultContentJoinGroups" className="control-label">
              <FormLabel helpId="user.myProfile.defaultContentJoinGroupsHelp" labelId="user.myProfile.defaultContentJoinGroups" />
            </label>
          </Col>
          <Col xs={10}>
            <FieldArray
              component={MultiSelectRenderer}
              name="defaultContentJoinGroups"
              options={selectGroups}
              selectedValues={defaultContentJoinGroups}
              labelKey="text"
              valueKey="value"
              emptyOptionTextId="app.chooseAnOption"
            />
          </Col>
        </FormGroup>
        <Field
          label={<FormLabel helpId="user.myProfile.defaultWidgetOwnerGroupHelp" labelId="user.myProfile.defaultWidgetOwnerGroup" />}
          component={RenderSelectInput}
          options={selectGroups}
          name="defaultWidgetOwnerGroup"
          defaultOptionId="app.chooseAnOption"
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
  defaultPageJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultContentJoinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default reduxForm({
  form: 'userPreferences',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(AppSettingsFormBody);
