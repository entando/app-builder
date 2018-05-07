import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup, Button, Alert } from 'patternfly-react';
import { formattedText } from '@entando/utils';


class UserAuthorityTable extends Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.group = null;
    this.role = null;
  }

  onClickAdd() {
    const { fields, groupRolesCombo } = this.props;
    if (this.group.value === this.role.value) {
      return;
    }

    const isPresent = Boolean(groupRolesCombo
      .find(item => item.group.code === this.group.value && item.role.code === this.role.value));

    if (!isPresent) {
      fields.push({
        group: this.group.value,
        role: this.role.value,
      });
    }
  }

  renderTable(renderRow) {
    if (this.props.groupRolesCombo.length === 0) {
      return (
        <div>
          <Alert type="info">
            <FormattedMessage id="user.authority.noAuthYet" />
          </Alert>
          <hr />
        </div>
      );
    }
    return (
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
          {renderRow}
        </tbody>
      </table>
    );
  }

  render() {
    const {
      groupRolesCombo, groups, roles, fields,
    } = this.props;
    const groupsWithEmpty =
          [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);
    const rolesWithEmpty =
          [{ code: '', name: formattedText('app.chooseAnOption') }].concat(roles);
    const groupOptions =
        groupsWithEmpty.map(gr => (<option key={gr.name} value={gr.code}>{gr.name}</option>));
    const rolesOptions =
        rolesWithEmpty.map(rl => (<option key={rl.name} value={rl.code}>{rl.name}</option>));

    const renderRow = groupRolesCombo.map((item, index) => (
      <tr key={`groupRole-${parseInt(index, 10)}`}>
        <td className="UserAuthorityTable__td">{item.group.name}</td>
        <td className="UserAuthorityTable__td text-center">{item.role.name}</td>
        <td className="UserAuthorityTable__td text-center">
          <Button
            bsStyle="link"
            className="UserAuthorityTable__delete-tag-btn"
            onClick={() => fields.remove(index)}
          >
            <i className="fa fa-trash-o" />
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="UserAuthorityTable" >
        {this.renderTable(renderRow)}
        <Row>
          <Col xs={12}>
            <h1><FormattedMessage id="user.authority.new" /></h1>
          </Col>
        </Row>
        <FormGroup>
          <Row>
            <label className="control-label col-xs-2" htmlFor="group">
              <FormattedMessage id="user.authority.groups" />
            </label>
            <Col xs={9}>
              <select
                className="form-control"
                name="group"
                ref={(group) => { this.group = group; }}
              >
                {groupOptions}
              </select>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <label className="control-label col-xs-2" htmlFor="roles">
              <FormattedMessage id="user.authority.roles" />
            </label>
            <Col xs={9}>
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
                className="pull-right UserAuthorityTable__add"
                onClick={this.onClickAdd}
              >
                <FormattedMessage id="app.add" />
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}

UserAuthorityTable.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  fields: PropTypes.shape({}).isRequired,
  groupRolesCombo: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
    role: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
  })),

};

UserAuthorityTable.defaultProps = {
  groups: [],
  roles: [],
  groupRolesCombo: {},
};

export default UserAuthorityTable;
