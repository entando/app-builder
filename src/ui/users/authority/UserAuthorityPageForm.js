import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, FormGroup, Button } from 'patternfly-react';
import { reduxForm, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from 'frontend-common-components';

export class UserAuthorityPageFormBody extends Component {
  constructor(props) {
    super(props);
    this.pushTable = this.pushTable.bind(this);
    this.fields = null;
    this.group = null;
    this.role = null;
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  pushTable() {
    const { fields } = this.props;

    console.log('PROPS', this.props);
    console.log('FIELDS', fields);
    fields.push({
      group: this.group.value,
      role: this.role.value,
    });
  }

  render() {
    const { groups, roles } = this.props;

    const groupsWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);

    const rolesWithEmpty =
      [{ code: '', name: formattedText('app.chooseAnOption') }].concat(roles);

    const groupOptions =
    groupsWithEmpty.map(gr => (<option key={gr.code} value={gr.code}>{gr.name}</option>));

    const rolesOptions =
    rolesWithEmpty.map(rl => (<option key={rl.code} value={rl.code}>{rl.name}</option>));


    const renderTableContent = ({ fields }) => (

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
            {this.props.fields &&
              this.props.fields.map((rowItem, i) => (
                <tr key={rowItem.group}>
                  <td className="AuthorizationTable__td">{rowItem.group}</td>
                  <td className="AuthorizationTable__td text-center">{rowItem.role}</td>
                  <td className="AuthorizationTable__td text-center">
                    <Button
                      bsStyle="link"
                      className="AuthorizationTable__delete-tag-btn"
                      onClick={() => fields.remove(i)}
                    >
                      <i className="fa fa-times" />
                    </Button>
                  </td>
                </tr>
          ))}
          </tbody>
        </table>

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
              <select
                className="form-control"
                name="roles"
                ref={(group) => { this.group = group; }}
              >
                {groupOptions}
              </select>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="plugin">
              <FormattedMessage id="user.authority.roles" />
            </label>
            <Col sm={9}>
              <select
                className="form-control"
                name="roles"
                ref={(role) => { this.role = role; }}
              >
                {rolesOptions}
              </select>
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
                onClick={this.pushTable}
              >
                <FormattedMessage id="app.add" />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </div>
    );


    return (
      <form onSubmit={this.onSubmit} className="UserAuthorityPageForm form-horizontal">
        <Col sm={12}>
          <Grid fluid>
            <Row>
              <Col sm={12}>
                <FieldArray
                  name="renderTable"
                  component={renderTableContent}
                />
              </Col>
            </Row>
          </Grid>

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
  fields: PropTypes.arrayOf(PropTypes.shape({})),

};

UserAuthorityPageFormBody.defaultProps = {
  onWillMount: () => {},
  fields: [{ }],
  groups: [],
  roles: [],
};

const UserAuthorityPageForm = reduxForm({
  form: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
