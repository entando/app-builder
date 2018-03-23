import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';


class UserAuthorityTable extends Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.group = null;
    this.role = null;
  }

  onClickAdd() {
    const { fields } = this.props;
    if (this.group.value === this.role.value) {
      return;
    }
    if (this.group.value || this.role.value) {
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
          <p>
            <FormattedMessage id="user.authority.noAuthYet" />
          </p>
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
    const { groups, roles, fields } = this.props;
    const groupsWithEmpty =
          [{ code: '', name: formattedText('app.chooseAnOption') }].concat(groups);
    const rolesWithEmpty =
          [{ code: '', name: formattedText('app.chooseAnOption') }].concat(roles);
    const groupOptions =
        groupsWithEmpty.map(gr => (<option key={gr.name} value={gr.name}>{gr.name}</option>));
    const rolesOptions =
        rolesWithEmpty.map(rl => (<option key={rl.name} value={rl.name}>{rl.name}</option>));

    const renderRow = this.props.groupRolesCombo.map((item, index) => (
      // eslint-disable-next-line
        <tr key={`groupRole-${index}`}>
          <td className="UserAuthorityTable__td">{item.group}</td>
          <td className="UserAuthorityTable__td text-center">{item.role}</td>
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
    group: PropTypes.string,
    role: PropTypes.string,
  })),
};

UserAuthorityTable.defaultProps = {
  groups: [],
  roles: [],
  groupRolesCombo: [],
};

export default UserAuthorityTable;
