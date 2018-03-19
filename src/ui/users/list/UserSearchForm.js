import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import { Row, Col, FormGroup, Button, InputGroup } from 'patternfly-react';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';

const PROFILE_FILTER_OPTIONS = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'with',
    label: 'User with a profile',
  },
  {
    id: 'without',
    label: 'User without a profile',
  },
];

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
    const { setProfileType } = this.props;
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
                className="form-control"
                name="username"
                placeholder={formattedText('user.table.username')}
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
                />
              </label>
            </Col>
          </Row>
        </FormGroup>
        {/* insert Advanced Search component when available
            Manage profileType selection when avalaible
        */}
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="profileType">
              <FormattedMessage id="user.profileType" />
            </label>
            <Col sm={9}>
              <InputGroup>
                <Field
                  component="select"
                  className="form-control"
                  name="profileType"
                >
                  <option>{formattedText('app.all')}</option>
                  {renderSelectOptions(this.props.profileTypes)}
                </Field>
                <span className="input-group-btn">
                  <Button onClick={this.handleClick(setProfileType)} className="UserSearchForm_set-profile-btn">
                    <FormattedMessage id="app.set" />
                  </Button>
                </span>
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>
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
  handleSubmit: PropTypes.func.isRequired,
  setProfileType: PropTypes.func,
  onWillMount: PropTypes.func,
  profileTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })),
};

UserSearchFormBody.defaultProps = {
  onWillMount: () => {},
  setProfileType: () => {},
  profileTypes: [],
};

const UserSearchForm = reduxForm({
  form: 'userSearch',
})(UserSearchFormBody);

export default UserSearchForm;
