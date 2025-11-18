import React from 'react';
import { Alert } from 'patternfly-react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ReloadConfirm = ({
  status, percentage, info, loading,
}) => {
  // Determine alert type based on status
  let alertType = 'info';
  let messageId = 'reloadConfiguration.confirm.progress';

  if (status === 'success') {
    alertType = 'success';
    messageId = 'reloadConfiguration.confirm.success';
  } else if (status === 'waiting') {
    alertType = 'warning';
    messageId = 'reloadConfiguration.confirm.waiting';
  } else if (status === 'fail') {
    alertType = 'danger';
    messageId = 'reloadConfiguration.confirm.fail';
  }

  // Render info table if available
  const renderInfoTable = () => {
    if (!info || Object.keys(info).length === 0) {
      return null;
    }

    const entries = Object.entries(info);

    return (
      <div className="ReloadConfirm__table">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <FormattedMessage id="reloadConfiguration.table.beanId" />
              </th>
              <th>
                <FormattedMessage id="reloadConfiguration.table.status" />
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([beanId, errorMessage], index) => {
              const hasError = errorMessage && errorMessage.trim().length > 0;
              return (
                <tr key={beanId}>
                  <td>{index + 1}</td>
                  <td>
                    {hasError ? <strong>{beanId}</strong> : beanId}
                  </td>
                  <td>
                    {hasError ? (
                      <span>
                        <FormattedMessage id="reloadConfiguration.bean.status.ko" />
                        : {errorMessage}
                      </span>
                    ) : (
                      <FormattedMessage id="reloadConfiguration.bean.status.ok" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const isInProgress = status === 'progress' || loading;

  return (
    <div className="ReloadConfirm">
      <Alert type={alertType}>
        <strong><FormattedMessage id={messageId} /></strong>
        {isInProgress && percentage !== null && percentage >= 0 && (
          <span> - {percentage}%</span>
        )}
      </Alert>
      {isInProgress && (
        <p className="text-muted">
          <i className="fa fa-spinner fa-spin" /> <FormattedMessage id="reloadConfiguration.confirm.pleaseWait" />
        </p>
      )}
      {renderInfoTable()}
    </div>
  );
};

ReloadConfirm.propTypes = {
  status: PropTypes.string,
  percentage: PropTypes.number,
  info: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool,
};

ReloadConfirm.defaultProps = {
  status: null,
  percentage: null,
  info: null,
  loading: false,
};

export default ReloadConfirm;
