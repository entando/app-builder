import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import PageTemplateListMenuActions from 'ui/page-templates/list/PageTemplateListMenuActions';
import PageTemplateDeleteModalContainer from 'ui/page-templates/common/PageTemplateDeleteModalContainer';
import paginatorMessages from 'ui/paginatorMessages';
import { DataTable } from '@entando/datatable';

const perPageOptions = [5, 10, 15, 25, 50];
class PageTemplateListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['code', 'descr']);
    }
    onWillMount();
  }

  getColumnDefs() {
    const { columnOrder } = this.props;

    const columnDefs = {
      code: {
        Header: <FormattedMessage id="app.code" />,
      },
      descr: {
        Header: <FormattedMessage id="app.name" />,
      },
    };

    return columnOrder.map(column => ({
      ...columnDefs[column],
      accessor: column,
    }));
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTable() {
    const {
      page,
      pageSize,
      intl,
      pageTemplates,
      removePageTemplate,
    } = this.props;

    const columns = this.getColumnDefs() || [];

    const pagination = { page, perPage: pageSize, perPageOptions };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const rowAction = {
      Header: <FormattedMessage id="app.actions" />,
      attributes: {
        className: 'text-center',
        width: '10%',
      },
      Cell: ({ values }) => (
        <PageTemplateListMenuActions
          code={values.code}
          onClickDelete={() => removePageTemplate(values.code)}
        />
      ),
    };

    return (
      <Col xs={12}>
        <DataTable
          columns={columns}
          data={pageTemplates}
          rowAction={rowAction}
          canReorder
          canResize
          classNames={{
            table: 'PageTemplateListTable__table',
          }}
        />
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
          messages={messages}
        />
      </Col>
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
  onSetColumnOrder: PropTypes.func,
  loading: PropTypes.bool,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  removePageTemplate: PropTypes.func.isRequired,
};

PageTemplateListTable.defaultProps = {
  onWillMount: () => {},
  onSetColumnOrder: () => {},
  columnOrder: [],
  loading: false,
  pageTemplates: [],
};

export default injectIntl(PageTemplateListTable);
