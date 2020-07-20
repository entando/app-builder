import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, Spinner } from 'patternfly-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import PageTemplateListMenuActions from 'ui/page-templates/list/PageTemplateListMenuActions';
import PageTemplateDeleteModalContainer from 'ui/page-templates/common/PageTemplateDeleteModalContainer';
import paginatorMessages from 'ui/paginatorMessages';

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
    return (
      <table className="PageTemplateListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th><FormattedMessage id="app.code" /></th>
            <th><FormattedMessage id="app.name" /></th>
            <th className="text-center" width="10%">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  renderPaginator() {
    const { page, pageSize, intl } = this.props;
    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };
    return (
      <Paginator
        pagination={pagination}
        viewType="table"
        itemCount={this.props.totalItems}
        onPageSet={this.changePage}
        onPerPageSelect={this.changePageSize}
        messages={messages}
      />
    );
  }

  renderRows() {
    const { removePageTemplate } = this.props;
    return (
      this.props.pageTemplates.map(pageTemplate => (
        <tr key={pageTemplate.code}>
          <td className="PageTemplateListTable__td">{pageTemplate.code}</td>
          <td className="PageTemplateListTable__td">{pageTemplate.descr}</td>
          <td className="PageTemplateListTable__td text-center">
            <PageTemplateListMenuActions
              code={pageTemplate.code}
              onClickDelete={() => removePageTemplate(pageTemplate.code)}
            />
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div className="PageTemplateListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          {this.renderPaginator()}
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
