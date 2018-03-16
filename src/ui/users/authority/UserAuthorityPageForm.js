import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, FormGroup, Button } from 'patternfly-react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
// import AuthorizationTable from 'ui/users/authority/AuthorizationTable';


const AuthorizationTable = () => (
  <div className="AuthorizationTable">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="user.authority.groups" />
          </th>
          <th className="text-center">
            <FormattedMessage id="user.authority.roles" />
          </th>
          <th className="text-center" width="10%">
            <FormattedMessage id="app.actions" />
          </th>
        </tr>
      </thead>
      <tbody>
        contenuto table
      </tbody>
    </table>
  </div>
);


export class UserAuthorityPageFormBody extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.renderTableContent = this.pushField.bind(this);
    this.select = null;
  }


  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const { selectedValues, fields } = this.props;

    if (this.select.value && !selectedValues.includes(this.select.value)) {
      fields.push(this.select.value);
    }
  }

  renderTableContent() {
    const { selectedValues, fields } = this.props;

    return selectedValues.map((item, index) => (
      <tr key={item.type}>
        <td className="AuthorizationTable__td">{item.group}</td>
        <td className="AuthorizationTable__td text-center">{item.role}</td>
        <td className="AuthorizationTable__td text-center">
          <Button
            bsStyle="link"
            className="AuthorizationTable__delete-tag-btn"
            onClick={() => fields.remove(index)}
          >
            <i className="fa fa-times" />
          </Button>
        </td>
      </tr>
    ));
  }

  render() {
    // const {
    //   handleSubmit, onSubmit,
    // } = this.props;
    //
    // const rolesWithEmpty = [{
    //   code: '',
    //   name: formattedText('app.chooseAnOption'),
    // }].concat(this.roles);
    //
    // const groupsWithEmpty = [{
    //   code: '',
    //   name: formattedText('app.chooseAnOption'),
    // }].concat(this.groups);

    return (
      <form onSubmit={this.onSubmit} className="UserAuthorityPageForm form-horizontal">
        <Col sm={12}>
          <Grid fluid>
            <Row>
              <Col sm={12}>
                <FieldArray
                  name="members"
                  component={AuthorizationTable}
                />
              </Col>
            </Row>
          </Grid>
          <Row>
            <Col sm={12}>
              <h1><FormattedMessage id="user.authority.new" /></h1>
            </Col>
          </Row>
          <FormGroup>
            <Row>
              <label className="control-label col-sm-2" htmlFor="widgetType">
                <FormattedMessage id="user.authority.groups" />
              </label>
              <Col sm={9}>
                <Field
                  component="select"
                  className="form-control"
                  name="widgetType"
                >
                  <option>{formattedText('app.chooseAnOption')}</option>
                  {this.props.groups.map(gr => (
                    <option
                      key={gr.code}
                      value={gr.code}
                    > {gr.name}
                    </option>))}
                </Field>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <label className="control-label col-sm-2" htmlFor="plugin">
                <FormattedMessage id="user.authority.roles" />
              </label>
              <Col sm={9}>
                <Field
                  component="select"
                  className="form-control"
                  name="role"
                  placeholder={formattedText('fragment.form.edit.plugin')}
                >
                  <option>{formattedText('app.chooseAnOption')}</option>
                  {this.props.roles.map(gr => (
                    <option
                      key={gr.code}
                      value={gr.code}
                    > {gr.name}
                    </option>))}
                </Field>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col xs={11}>
                <Button
                  type="button"
                  bsStyle="primary"
                  className="pull-right"
                  onClick={this.pushField()}
                >
                  <FormattedMessage id="app.add" />
                </Button>
              </Col>
            </Row>
          </FormGroup>
          <Col sm={12}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right"
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Col>
      </form>
    );
  }
}

UserAuthorityPageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  selectedValues: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })),
  fields: PropTypes.shape({}).isRequired,
};

UserAuthorityPageFormBody.defaultProps = {
  onWillMount: () => {},
  groups: [],
  roles: [],
  selectedValues: [],
};

const UserAuthorityPageForm = reduxForm({
  form: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
