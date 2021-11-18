import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, Button, Alert } from 'patternfly-react';

import AddAuthorityModal from 'ui/users/common/AddAuthorityModal';
import { TEST_ID_USER_AUTHORITY_TABLE } from 'ui/test-const/user-test-const';

const msgs = defineMessages({
  chooseOption: {
    id: 'app.chooseAnOption',
    defaultMessage: 'Choose',
  },
});

const UserAuthorityTable = ({
  push, remove,
  groupRolesCombo, onCloseModal,
  intl, groups, roles, onAddNewClicked,
}) => {
  const setGroupRef = useRef(null);
  const setRoleRef = useRef(null);

  const onClickAdd = () => {
    const group = setGroupRef.current;
    const role = setRoleRef.current;
    const isPresent = Boolean(groupRolesCombo
      .find(item => (group.value === '' || item.group.code === group.value) &&
        (role.value === '' || item.role.code === role.value)));
    if (!isPresent) {
      console.log('toadd', { group: group.value || null,
        role: role.value || null })
      push({
        group: group.value || null,
        role: role.value || null,
      });
    }
    onCloseModal();
  };

  const renderTable = (renderRow) => {
    if (groupRolesCombo.length === 0) {
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
      <table className="table table-striped table-bordered" data-testid={TEST_ID_USER_AUTHORITY_TABLE.TABLE}>
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
  };

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
          onClick={() => remove(index)}
          data-testid={TEST_ID_USER_AUTHORITY_TABLE.DELETE_BUTTON}
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
            data-testid={TEST_ID_USER_AUTHORITY_TABLE.ADD_BUTTON}
          >
              Add new Authorization
          </Button>
        </Col>
      </Row>
      {renderTable(renderRow)}
      <AddAuthorityModal
        groupOptions={groupOptions}
        rolesOptions={rolesOptions}
        onClickAdd={onClickAdd}
        setGroupRef={setGroupRef}
        setRoleRef={setRoleRef}
      />
    </div>
  );
};

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
  groupRolesCombo: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
    role: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
  })),
  onAddNewClicked: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

UserAuthorityTable.defaultProps = {
  groups: [],
  roles: [],
  groupRolesCombo: {},
};

export default injectIntl(UserAuthorityTable);
