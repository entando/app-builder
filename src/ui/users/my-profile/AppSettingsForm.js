import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  Col,
  Form,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import MultiSelectRenderer from 'ui/common/formik-field/MultiSelectRenderer';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import { withFormik, Field, Form as FormikForm, FieldArray } from 'formik';
import SelectInput from '../../common/formik-field/SelectInput';
import SwitchInput from '../../common/formik-field/SwitchInput';

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
      selectGroups,
    } = this.props;

    return (
      <FormikForm>
        <Form
          horizontal
          className="AppSettingsForm"
          data-testid="appSettingsForm"
        >
          <FormSectionTitle titleId="user.myProfile.appSettingsSection" />
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.wizardToggleHelp"
                labelId="user.myProfile.wizardToggle"
              />
            }
            component={SwitchInput}
            name="wizard"
          />
          <Field
            label={<FormLabel labelId="user.myProfile.disableContentMenu" />}
            component={SwitchInput}
            name="disableContentMenu"
          />
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.translationWarningHelp"
                labelId="user.myProfile.translationWarning"
              />
            }
            component={SwitchInput}
            name="translationWarning"
          />
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.loadOnPageSelectHelp"
                labelId="user.myProfile.loadOnPageSelect"
              />
            }
            component={SwitchInput}
            name="loadOnPageSelect"
          />
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.defaultPageOwnerGroupHelp"
                labelId="user.myProfile.defaultPageOwnerGroup"
              />
            }
            component={SelectInput}
            options={selectGroups}
            name="defaultPageOwnerGroup"
            defaultOptionId="app.chooseAnOption"
          />
          <FormGroup>
            <Col xs={2} className="text-right">
              <label htmlFor="defaultPageJoinGroups" className="control-label">
                <FormLabel
                  helpId="user.myProfile.defaultPageJoinGroupsHelp"
                  labelId="user.myProfile.defaultPageJoinGroups"
                />
              </label>
            </Col>
            <Col xs={10}>
              <FieldArray
                render={arrayHelpers => (<MultiSelectRenderer
                  arrayHelpers={arrayHelpers}
                  allOptions={selectGroups}
                  selectedValues={[]}
                  labelKey="text"
                  valueKey="value"
                  emptyOptionTextId="app.chooseAnOption"
                  name="defaultPageJoinGroups"
                />)}
                name="defaultPageJoinGroups"
              />
            </Col>
          </FormGroup>
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.defaultContentOwnerGroupHelp"
                labelId="user.myProfile.defaultContentOwnerGroup"
              />
            }
            component={SelectInput}
            options={selectGroups}
            name="defaultContentOwnerGroup"
            defaultOptionId="app.chooseAnOption"
          />
          <FormGroup>
            <Col xs={2} className="text-right">
              <label htmlFor="defaultContentJoinGroups" className="control-label">
                <FormLabel
                  helpId="user.myProfile.defaultContentJoinGroupsHelp"
                  labelId="user.myProfile.defaultContentJoinGroups"
                />
              </label>
            </Col>
            <Col xs={10}>
              <FieldArray
                render={arrayHelpers => (<MultiSelectRenderer
                  arrayHelpers={arrayHelpers}
                  allOptions={selectGroups}
                  selectedValues={[]}
                  labelKey="text"
                  valueKey="value"
                  name="defaultContentJoinGroups"
                />)}
                name="defaultContentJoinGroups"
                options={selectGroups}
              />
            </Col>
          </FormGroup>
          <Field
            label={
              <FormLabel
                helpId="user.myProfile.defaultWidgetOwnerGroupHelp"
                labelId="user.myProfile.defaultWidgetOwnerGroup"
              />
            }
            component={SelectInput}
            options={selectGroups}
            name="defaultWidgetOwnerGroup"
            defaultOptionId="app.chooseAnOption"
          />
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            data-testid="settings_saveBtn"
          >
            <FormattedMessage id="app.save" />
          </Button>
        </Form>
      </FormikForm>
    );
  }
}

AppSettingsFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  selectGroups: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })).isRequired,
};

export default withFormik({
  displayName: 'userPreferences',
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  handleSubmit: (values, { setSubmitting, props: { onSubmit, username } }) => {
    onSubmit({ username, data: values }).then(() => setSubmitting(false));
  },
})(AppSettingsFormBody);
