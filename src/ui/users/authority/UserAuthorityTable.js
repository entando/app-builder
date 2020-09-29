import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, Button, Alert } from 'patternfly-react';

import AddAuthorityModal from 'ui/users/common/AddAuthorityModal';

const msgs = defineMessages({
  chooseOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
});

class UserAuthorityTable extends Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.group = null;
    this.role = null;
  }

  onClickAdd() {
    const { fields, groupRolesCombo, onCloseModal } = this.props;

    const isPresent = Boolean(groupRolesCombo
      .find(item => (this.group.value === '' || item.group.code === this.group.value) &&
        (this.role.value === '' || item.role.code === this.role.value)));

    if (!isPresent) {
      fields.push({
        group: this.group.value || null,
        role: this.role.value || null,
      });
    }
    onCloseModal();
  }

  setGroupRef = (group) => {
    this.group = group;
  }

  setRoleRef = (role) => {
    this.role = role;
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
      intl, groupRolesCombo, groups, roles, fields, onAddNewClicked,
    } = this.props;
    const groupsWithEmpty =
          [{ code: '', name: intl.formatMessage(msgs.chooseOption) }].concat(groups);
    const rolesWithEmpty =
          [{ code: '', name: intl.formatMessage(msgs.chooseOption) }].concat(roles);
    const groupOptions =
        groupsWithEmpty.map(gr => (<option key={gr.name} value={gr.code}>{gr.name}</option>));
    const rolesOptions =
        rolesWithEmpty.map(rl => (<option key={rl.name} value={rl.code}>{rl.name}</option>));

    const renderRow = groupRolesCombo.map((item, index) => (
      <tr key={`groupRole-${parseInt(index, 10)}`}>
        <td className="UserAuthorityTable__td">{item.group.name || <i className="fa fa-minus" />}</td>
        <td className="UserAuthorityTable__td text-center">{item.role.name || <i className="fa fa-minus" />}</td>
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
        <Row>
          <Col xs={12} style={{ paddingBottom: 15 }}>
            <Button
              type="button"
              bsStyle="primary"
              className="pull-right UserAuthorityTable__addNew"
              onClick={onAddNewClicked}
            >
                Add new Authorization
            </Button>
          </Col>
        </Row>
        {this.renderTable(renderRow)}
        <AddAuthorityModal
          groupOptions={groupOptions}
          rolesOptions={rolesOptions}
          onClickAdd={this.onClickAdd}
          setGroupRef={this.setGroupRef}
          setRoleRef={this.setRoleRef}
        />
      </div>
    );
  }
}

UserAuthorityTable.propTypes = {
  intl: intlShape.isRequired,
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
  onAddNewClicked: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

UserAuthorityTable.defaultProps = {
  groups: [],
  roles: [],
  groupRolesCombo: {},
};

export default injectIntl(UserAuthorityTable);
