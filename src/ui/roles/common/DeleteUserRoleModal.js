import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal, Spinner, Paginator, Alert,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';
import { formatDate, routeConverter, hasAccess } from '@entando/utils';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStatus from 'ui/users/common/UserStatus';
import paginatorMessages from 'ui/paginatorMessages';
import { ROUTE_USER_AUTHORITY } from 'app-init/router';
import { CRUD_USERS_PERMISSION } from 'state/permissions/const';

export const MODAL_ID = 'DeleteUserRoleModal';

class DeleteRoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserReferences = this.renderUserReferences.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { fetchRoleReferences, info } = this.props;
    if (info.code && info.code !== prevProps.info.code) {
      fetchRoleReferences(info.code);
    }
  }

  changePage(page) {
    const { onPageChange, pagination: { pageSize }, info } = this.props;
    onPageChange(info.code, { page, pageSize });
  }

  changePageSize(pageSize) {
    const { onPageChange, info } = this.props;
    onPageChange(info.code, { page: 1, pageSize });
  }

  renderUserReferences() {
    const { userReferences, pagination, userPermissions } = this.props;
    const { page, pageSize: perPage, totalItems } = pagination;
    const paginationObj = {
      page,
      perPage,
      perPageOptions: [5, 10],
    };
    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: this.props.intl.formatMessage(paginatorMessages[curr]) }
    ), {});
    const canEdit = hasAccess(CRUD_USERS_PERMISSION, userPermissions);
    return (
      <React.Fragment>
        <Table className="UserRefsTable__table" striped bordered condensed hover >
          <thead>
            <tr>
              <th className="text-center" width="40%"><FormattedMessage id="user.table.username" /></th>
              <th className="text-center" width="54%"><FormattedMessage id="user.lastLogin" /></th>
              <th className="text-center" width="6%"><FormattedMessage id="user.table.status" /></th>
            </tr>
          </thead>
          <tbody>
            {
            userReferences.filter(ref => ref != null).map(reference => (
              <tr key={reference.username}>
                <td>
                  {
                    canEdit ? (
                      <Link
                        to={routeConverter(
                        ROUTE_USER_AUTHORITY,
                        { username: reference.username },
                      )}
                      >
                        {reference.username}
                      </Link>
                    ) : (<React.Fragment>{reference.username}</React.Fragment>)
                  }
                </td>
                <td>{formatDate(reference.lastLogin)}</td>
                <td className="text-center">
                  <UserStatus status={reference.status === 'active' ? 'active' : 'disabled'} />
                </td>
              </tr>))
          }
          </tbody>
        </Table>
        <Paginator
          pagination={paginationObj}
          viewType="table"
          itemCount={totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
          messages={messages}
        />
      </React.Fragment>
    );
  }

  render() {
    const {
      onConfirmDelete, info, loading, onCloseModal, userReferences,
    } = this.props;
    const canDelete = !loading && userReferences.length === 0;
    const buttons = !canDelete ? [] : [
      <Button bsStyle="danger" id="DeleteRoleModal__button-delete" onClick={() => (onConfirmDelete(info.code))}>
        <FormattedMessage id="app.delete" />
      </Button>,
    ];

    const modalTitle = (
      <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
    );

    const body = userReferences.length === 0 ? (
      <EmptyStateInfo className="DeleteRoleModal__info">
        <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
      </EmptyStateInfo>
    ) : this.renderUserReferences();

    return (
      <GenericModalContainer
        modalId={MODAL_ID}
        buttons={buttons}
        modalTitle={modalTitle}
        className="DeleteRoleModal"
        modalCloseCleanup={onCloseModal}
      >
        <EmptyState style={{ padding: '90px 40px' }}>
          {
            canDelete ? (
              <React.Fragment>
                <EmptyStateIcon name="exclamation" type="fa" className="DeleteRoleModal__icon" />
                <EmptyStateTitle>
                  <FormattedMessage id="app.delete" />&nbsp;{info.type}
                </EmptyStateTitle>
              </React.Fragment>
            ) : (
              <Alert type="warning">
                <code>{info.code}</code>{' '}<FormattedMessage id="app.deleteRoleImpossible" />
              </Alert>
            )
          }
          <Spinner loading={loading}>
            {
              body
            }
          </Spinner>
        </EmptyState>
      </GenericModalContainer>
    );
  }
}

DeleteRoleModal.propTypes = {
  intl: intlShape.isRequired,
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
  loading: PropTypes.bool,
  userReferences: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    fullName: PropTypes.string,
    lastLogin: PropTypes.string,
    status: PropTypes.string,
  })),
  fetchRoleReferences: PropTypes.func,
  onCloseModal: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalItems: PropTypes.number,
  }).isRequired,
  onPageChange: PropTypes.func,
  userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DeleteRoleModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    code: '',
    type: '',
  },
  loading: false,
  userReferences: [],
  fetchRoleReferences: () => {},
  onPageChange: () => {},
};

export default injectIntl(DeleteRoleModal);
