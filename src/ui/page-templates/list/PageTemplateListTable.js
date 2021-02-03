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

const perPageOptions = [5, 10, 15, 25, 50];

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

    this.state = {
      // you can change the orders of column here,
      columns: [
        {
          Header: <FormattedMessage id="app.code" />,
          accessor: 'code',
        },
        {
          Header: <FormattedMessage id="app.name" />,
          accessor: 'descr',
        },
        {
          Header: 'Main Frame',
          accessor: 'mainFrame',
        },
      ],
      dragOver: '',
    };

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  setDragOver(dragOver) {
    this.setState({ dragOver });
  }

  setColumns(columns) {
    this.setState({ columns });
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  handleDragStart(ev) {
    const { columns } = this.state;
    const { id } = ev.target;
    const idx = columns.findIndex(col => col.accessor === id);
    ev.dataTransfer.setData('colIdx', idx);
  }

  handleDragOver = e => e.preventDefault();

  handleDragEnter({ target }) {
    const { id } = target;
    this.setDragOver(id);
  }

  handleOnDrop(ev) {
    const { id } = ev.target;
    const { columns } = this.state;
    const droppedColIdx = columns.findIndex(col => col.accessor === id);
    const draggedColIdx = ev.dataTransfer.getData('colIdx');
    const tempCols = [...columns];

    tempCols[draggedColIdx] = columns[droppedColIdx];
    tempCols[droppedColIdx] = columns[draggedColIdx];
    this.setColumns(tempCols);
    this.setDragOver('');
  }

  renderTable() {
    const {
      page,
      pageSize,
      intl,
      pageTemplates,
    } = this.props;

    const { columns, dragOver } = this.state;

    const pagination = { page, perPage: pageSize, perPageOptions };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <MakeTable tableInfo={{ columns, data: pageTemplates }}>
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
                      id={column.id}
                      key={column.id}
                      draggable
                      onDragStart={this.handleDragStart}
                      onDragOver={this.handleDragOver}
                      onDrop={this.handleOnDrop}
                      onDragEnter={this.handleDragEnter}
                      dragOver={column.id === dragOver}
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
