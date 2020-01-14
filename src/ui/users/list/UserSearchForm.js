import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';
import { PROFILE_FILTER_OPTIONS } from 'ui/users/common/const';

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
  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }

  render() {
    const { intl } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="UserSearchForm form-horizontal well">
        <h3><FormattedMessage id="app.search" /></h3>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="username">
              <FormattedMessage id="user.table.username" />
            </label>
            <Col sm={9}>
              <Field
                id="username"
                component="input"
                className="form-control UserSearchForm__username"
                name="username"
                placeholder={intl.formatMessage(msgs.username)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="username">
              <FormattedMessage id="user.searchForm.users" />
            </label>
            <Col sm={9}>
              <label htmlFor="withProfile" >
                <Field
                  component={RenderRadioInput}
                  toggleElement={PROFILE_FILTER_OPTIONS}
                  defaultValue={PROFILE_FILTER_OPTIONS[0].id}
                  name="withProfile"
                  className="UserSearchForm__withProfile"
                />
              </label>
            </Col>
          </Row>
        </FormGroup>
        {/* insert Advanced Search component when available */}
        {/* Manage profileType selection when avalaible */}
        <FormGroup>
          <Row>
            <Col xs={11}>
              <Button
                type="submit"
                bsStyle="primary"
                className="pull-right"
              >
                <FormattedMessage id="app.search" />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </form>
    );
  }
}

UserSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
};

const UserSearchForm = reduxForm({
  form: 'userSearch',
})(UserSearchFormBody);

export default injectIntl(UserSearchForm);
