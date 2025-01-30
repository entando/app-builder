import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Col, Paginator } from 'patternfly-react';
import paginatorMessages from 'ui/paginatorMessages';
import { TEST_ID_USER_LIST_TABLE } from 'ui/test-const/user-test-const';

const UserTable = (props) => {
  const {
    intl, columns, rows, pagination, totalItems, onChangePage, onChangePageSize,
  } = props;

  const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
    { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
  ), {});

  return (
    <Col xs={12}>
      <div className="UserTableWrapper">
        <table className="table table-bordered UserTable" data-testid={TEST_ID_USER_LIST_TABLE.TABLE}>
          <thead>
            <tr className="table-header">
              {columns.map(({ title, className }) => (
                <th key={title} className={`${className ? `${className} ` : ''}table-cell`}>
                  {title ? <FormattedMessage id={title} defaultMessage="" /> : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.toString()}>
                {columns.map(({ title, field, render }) => {
                  const value = () => (render ? render(row) : row[field] || '');
                  return <td key={`${title}-${field}`} className="table-cell">{value()}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator
          viewType="table"
          pagination={pagination}
          itemCount={totalItems}
          onPageSet={onChangePage}
          onPerPageSelect={onChangePageSize}
          messages={messages}
        />
      </div>
    </Col>
  );
};

UserTable.propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    className: PropTypes.string,
    render: PropTypes.func,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    perPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
  }).isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func.isRequired,
};

export default UserTable;
