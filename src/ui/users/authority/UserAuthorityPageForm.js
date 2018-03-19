import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, FormGroup, Button } from 'patternfly-react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';
import AuthorizationTable from 'ui/users/authority/AuthorizationTable';

export class UserAuthorityPageFormBody extends Component {
  constructor(props) {
    super(props);
    this.select = null;
    this.fields = ' ';
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      selectedJoinValues, groups, roles, fields,
    } = this.props;

    const groupsWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);

    const rolesWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(roles);

    const groupOptions =
    groupsWithEmpty.map(gr => (<option key={gr.code} value={gr.code}>{gr.name}</option>));

    const rolesOptions =
    rolesWithEmpty.map(rl => (<option key={rl.code} value={rl.code}>{rl.name}</option>));

    return (
      <form onSubmit={this.onSubmit} className="UserAuthorityPageForm form-horizontal">
        <Col sm={12}>
          <Grid fluid>

            <Row>
              <Col sm={12}>
                <FieldArray
                  name="renderTable"
                  component={AuthorizationTable}
                  selectedValues={selectedJoinValues}
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
                  name="groups"
                  emptyOptionTextId="app.chooseAnOption"
                >
                  {groupOptions}
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
                  name="roles"
                  placeholder={formattedText('fragment.form.edit.plugin')}
                >
                  {rolesOptions}
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
                  onClick={() => this.fields.push({})}
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
  selectedJoinValues: PropTypes.shape({}).isRequired,
  fields: PropTypes.shape({}).isRequired,
};

UserAuthorityPageFormBody.defaultProps = {
  onWillMount: () => {},
  groups: [],
  roles: [],
};

const UserAuthorityPageForm = reduxForm({
  form: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
