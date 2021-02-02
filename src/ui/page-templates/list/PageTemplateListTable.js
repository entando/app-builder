import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import ColumnResizer from 'react-column-resizer';
import { useTable } from 'react-table';

import PageTemplateListMenuActions from 'ui/page-templates/list/PageTemplateListMenuActions';
import PageTemplateDeleteModalContainer from 'ui/page-templates/common/PageTemplateDeleteModalContainer';
import paginatorMessages from 'ui/paginatorMessages';

const ReactTableContext = React.createContext(null);

const MakeTable = ({ tableInfo, children }) => {
  const tableProps = useTable({
    ...tableInfo,
  });
  return (
    <ReactTableContext.Provider value={tableProps}>
      <ReactTableContext.Consumer>
        {children}
      </ReactTableContext.Consumer>
    </ReactTableContext.Provider>
  );
};

class PageTemplateListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTable() {
    const { page, pageSize, intl } = this.props;
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <MakeTable
        tableInfo={{
          // you can change the orders of column here,
          columns: [
            {
              Header: intl.formatMessage({ id: 'app.code' }),
              accessor: 'code',
            },
            {
              Header: intl.formatMessage({ id: 'app.name' }),
              accessor: 'descr',
            },
          ],
          data: this.props.pageTemplates,
        }}
      >
        {({
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
        }) => (
          <Col xs={12}>
            <table {...getTableProps()} className="PageTemplateListTable__table table table-striped table-bordered">
              <thead>
                <tr {...headerGroups[0].getHeaderGroupProps()}>
                  {headerGroups[0].headers.map(column => ([
                    <th
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>,
                    <ColumnResizer className="columnResizer" />,
                  ]))}
                  <th className="text-center" width="10%">
                    <FormattedMessage id="app.actions" />
                  </th>
                </tr>
              </thead>
              <tbody {...getTableBodyProps()}>
                {this.renderRows({ prepareRow, rows })}
              </tbody>
            </table>
            <Paginator
              pagination={pagination}
              viewType="table"
              itemCount={this.props.totalItems}
              onPageSet={this.changePage}
              onPerPageSelect={this.changePageSize}
              messages={messages}
            />
          </Col>
        )}
      </MakeTable>
    );
  }

  renderRows({ prepareRow, rows }) {
    const { removePageTemplate } = this.props;
    return (
      rows.map((row) => {
        prepareRow(row);
        const { values } = row;
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(pageTemplate => ([
              <td
                {...pageTemplate.getCellProps()}
                className="PageTemplateListTable__td"
              >
                {pageTemplate.render('Cell')}
              </td>,
              <td className="colForResize" />,
            ]))}
            <td className="PageTemplateListTable__td text-center">
              <PageTemplateListMenuActions
                code={values.code}
                onClickDelete={() => removePageTemplate(values.code)}
              />
            </td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <div className="PageTemplateListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <PageTemplateDeleteModalContainer />
        </Spinner>
      </div>
    );
  }
}

PageTemplateListTable.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  removePageTemplate: PropTypes.func.isRequired,
};

PageTemplateListTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  pageTemplates: [],
};

export default injectIntl(PageTemplateListTable);
