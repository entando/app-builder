import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import ProfileTypeListMenuActions from 'ui/profile-types/list/ProfileTypeListMenuActions';
import ProfileTypeStatusIcon from 'ui/profile-types/common/ProfileTypeStatusIcon';
import ProfileTypesDeleteModalContainer from 'ui/profile-types/common/ProfileTypesDeleteModalContainer';
import ProfileTypeReferenceStatusContainer from 'ui/profile-types/common/ProfileTypeReferenceStatusContainer';
import UserTable from 'ui/users/common/UserTable';

const msgs = defineMessages({
  profileStatus: {
    id: 'profileType.table.status',
    defaultMessage: 'Status',
  },
});

const ProfileTypeListTable = ({
  profiletypes, intl, page, pageSize, totalItems,
  loading, onDidMount, removeProfileType, reloadProfileType,
}) => {
  useEffect(() => {
    onDidMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = pagenum => (
    onDidMount({ page: pagenum, pageSize })
  );

  const changePageSize = size => (
    onDidMount({ page: 1, pageSize: size })
  );

  const columns = [
    { title: 'app.name', field: 'name', className: 'RoleListTable__th-lg' },
    { title: 'app.code', field: 'code', className: 'ProfileTypeListTable__th-xs' },
    {
      title: 'profileType.table.status',
      field: 'status',
      className: 'ProfileTypeListTable__th-xs text-center',
      render: props => (
        <div style={{ textAlign: 'center' }}>
          <ProfileTypeStatusIcon
            status={(props || {}).status}
            title={intl.formatMessage(msgs.profileStatus)}
          />
        </div>
      ),
    },
    {
      title: '',
      field: 'actions',
      className: 'ProfileTypeListTable__th-xs text-center',
      render: props => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileTypeListMenuActions
            code={(props || {}).code}
            onClickDelete={removeProfileType}
            onClickReload={reloadProfileType}
          />
        </div>
      ),
    },
  ];

  const renderTable = () => {
    if (profiletypes.length > 0) {
      const pagination = { page, perPage: pageSize, perPageOptions: [5, 10, 15, 25, 50] };

      return (
        <div>
          <Col xs={12}>
            <ProfileTypeReferenceStatusContainer />
          </Col>
          <UserTable
            intl={intl}
            columns={columns}
            rows={profiletypes}
            pagination={pagination}
            totalItems={totalItems}
            onChangePage={changePage}
            onChangePageSize={changePageSize}
          />
        </div>
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="profileType.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  };

  return (
    <Spinner loading={!!loading} >
      <div className="ProfileTypeListTable">
        {renderTable()}
        <ProfileTypesDeleteModalContainer />
      </div>
    </Spinner>
  );
};

ProfileTypeListTable.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  loading: PropTypes.bool,
  profiletypes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  removeProfileType: PropTypes.func.isRequired,
  reloadProfileType: PropTypes.func.isRequired,
};

ProfileTypeListTable.defaultProps = {
  onDidMount: () => { },
  loading: false,
  profiletypes: [],
};

export default injectIntl(ProfileTypeListTable);
