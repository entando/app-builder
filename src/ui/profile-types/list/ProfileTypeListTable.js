import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { DataTable } from '@entando/datatable';
import ProfileTypeListMenuActions from 'ui/profile-types/list/ProfileTypeListMenuActions';
import ProfileTypeStatusIcon from 'ui/profile-types/common/ProfileTypeStatusIcon';
import ProfileTypesDeleteModalContainer from 'ui/profile-types/common/ProfileTypesDeleteModalContainer';
import ProfileTypeReferenceStatusContainer from 'ui/profile-types/common/ProfileTypeReferenceStatusContainer';
import paginatorMessages from 'ui/paginatorMessages';

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
  }, []);

  const changePage = pagenum => (
    onDidMount({ page: pagenum, pageSize })
  );

  const changePageSize = size => (
    onDidMount({ page: 1, pageSize: size })
  );

  const getColumnDefs = () => {
    const columnDefs = {
      name: {
        Header: <FormattedMessage id="app.name" />,
      },
      code: {
        Header: <FormattedMessage id="app.code" />,
        attributes: {
          className: 'ProfileTypeListTable__th-xs text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
      },
      status: {
        Header: <FormattedMessage id="profileType.table.status" />,
        attributes: {
          className: 'ProfileTypeListTable__th-xs text-center',
        },
        cellAttributes: {
          className: 'text-center',
        },
        Cell: (cellprops) => {
          const { row: { original: { status } } } = cellprops;
          return (
            <ProfileTypeStatusIcon
              status={status}
              title={intl.formatMessage(msgs.profileStatus)}
            />
          );
        },
      },
    };

    return ['name', 'code', 'status'].map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  };

  const columns = getColumnDefs() || [];

  const rowAction = {
    Header: <FormattedMessage id="app.actions" />,
    attributes: {
      className: 'ProfileTypeListTable__th-xs text-center',
    },
    cellAttributes: {
      className: 'text-center',
    },
    Cell: (cellprops) => {
      const { values: { code } } = cellprops;
      return (
        <ProfileTypeListMenuActions
          code={code}
          onClickDelete={removeProfileType}
          onClickReload={reloadProfileType}
        />
      );
    },
  };

  const renderTable = () => {
    if (profiletypes.length > 0) {
      const pagination = {
        page,
        perPage: pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
        { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
      ), {});

      return (
        <Col xs={12}>
          <ProfileTypeReferenceStatusContainer />
          <DataTable
            columns={columns}
            data={profiletypes}
            rowAction={rowAction}
            classNames={{
              table: 'ProfileTypeListTable__table table table-striped',
              cell: 'ProfileTypeListRow__td',
            }}
          />
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={changePage}
            onPerPageSelect={changePageSize}
            messages={messages}
          />
        </Col>
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
  onDidMount: () => {},
  loading: false,
  profiletypes: [],
};

export default injectIntl(ProfileTypeListTable);
