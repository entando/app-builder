import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner, Alert, Paginator } from 'patternfly-react';
import { Table } from 'react-bootstrap';

class GenericRefsTable extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { componentDidMount } = this.props;
    componentDidMount();
  }

  changePage(page) {
    const { onPageChange, pagination: { pageSize }, referenceKey } = this.props;
    onPageChange(referenceKey, { page, pageSize });
  }

  changePageSize(pageSize) {
    const { onPageChange, referenceKey } = this.props;
    onPageChange(referenceKey, { page: 1, pageSize });
  }

  render() {
    const {
      referenceKey, references, loading, columns, pagination,
    } = this.props;

    const { page, pageSize: perPage, totalItems } = pagination;
    const paginationObj = {
      page,
      perPage,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    const renderRows = () => references.map((reference, index) => (
      <tr key={reference.code ? reference.code : `${referenceKey}-tr-${index}`}>
        {Object.keys(columns)
        .filter(refKey => (Object.keys(reference)).includes(refKey))
        .map((objKey) => {
          const { tdClass, render } = columns[objKey] || {};
          return (
            <td key={`${referenceKey}-td-${objKey}`} className={`GenericRefsTable__td ${tdClass}`}>
              {render(reference[objKey], reference.id)}
            </td>
          );
        })}
      </tr>
    ));

    const renderTable = () => {
      if (references.length > 0) {
        return (
          <div>
            <Table className="GenericRefsTable__table" striped bordered condensed hover >
              <thead>
                <tr>
                  {
                  Object.keys(columns)
                  .filter(refKey => (Object.keys(references[0])).includes(refKey))
                  .map(objKey => (
                    <th
                      key={`${referenceKey}-th-${objKey}`}
                      className={`GenericRefsTable__th ${(columns[objKey] || {}).thClass}`}
                    >
                      <FormattedMessage
                        id={((columns[objKey] || {}).label || {}).id}
                        defaultMessage={((columns[objKey] || {}).label || {}).defaultMessage}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {renderRows()}
              </tbody>
            </Table>
            <Paginator
              pagination={paginationObj}
              viewType="table"
              itemCount={totalItems}
              onPageSet={this.changePage}
              onPerPageSelect={this.changePageSize}
            />
          </div>
        );
      }
      return (
        <Alert type="info">
          <strong><FormattedMessage id={`reference.noReference${referenceKey}`} /></strong>
        </Alert>
      );
    };

    return (
      <div className="GenericRefsTable">
        <Spinner loading={loading} >
          {renderTable()}
        </Spinner>
      </div>
    );
  }
}

GenericRefsTable.propTypes = {
  componentDidMount: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  references: PropTypes.arrayOf(PropTypes.shape({})),
  referenceKey: PropTypes.string,
  columns: PropTypes.shape({}),
  pagination: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalItems: PropTypes.number,
  }).isRequired,
};

GenericRefsTable.defaultProps = {
  componentDidMount: () => {},
  loading: false,
  references: [],
  referenceKey: '',
  columns: {},
};

export default GenericRefsTable;
