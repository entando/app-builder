import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import { TEST_ID_USER_SEARCH_FORM } from 'ui/test-const/user-test-const';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';

export const renderSelectOptions = options => (
  options.map(option => (
    <option
      key={option.value}
      value={option.value}
    >
      {option.text}
    </option>
  ))
);

const msgs = defineMessages({
  username: {
    id: 'user.table.username',
    defaultMessage: 'Username',
  },
});

export class UserSearchFormBody extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }

  render() {
    const { intl, isValid, isSubmitting } = this.props;
    return (
      <Form className="UserSearchForm form-horizontal well" data-testid={TEST_ID_USER_SEARCH_FORM.FORM} aria-label="form">
        <h3><FormattedMessage id="app.search" /></h3>
        <FormGroup>
          <div>
            <label className="control-label col-sm-2" htmlFor="username">
              <FormattedMessage id="user.table.username" />
            </label>
            <Col sm={9}>
              <Field
                id="username"
                inputSize={10}
                labelSize={0}
                component={RenderTextInput}
                className="form-control UserSearchForm__username"
                name="username"
                placeholder={intl.formatMessage(msgs.username)}
                data-testid={TEST_ID_USER_SEARCH_FORM.USERNAME_FIELD}
              />
            </Col>
          </div>
        </FormGroup>
        {/* Form for user profiletype search */}
        {/* insert Advanced Search component when available */}
        {/* Manage profileType selection when avalaible */}
        <FormGroup>
          <Row>
            <Col xs={11}>
              <Button
                type="submit"
                bsStyle="primary"
                className="pull-right"
                data-testid={TEST_ID_USER_SEARCH_FORM.SEARCH_BUTTON}
                disabled={!isValid || isSubmitting}
              >
                <FormattedMessage id="app.search" />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

UserSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func.isRequired,
};

const UserSearchForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  validationSchema: () => (
    Yup.object().shape({
      username: Yup.string().nullable(true),
    })
  ),
  handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
    onSubmit(values).then(() => setSubmitting(false));
  },
  displayName: 'userSearchFormFormik',
})(UserSearchFormBody);

export default injectIntl(UserSearchForm);
