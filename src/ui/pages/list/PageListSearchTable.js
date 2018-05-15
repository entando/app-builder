import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paginator, Spinner, Alert } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';

class PageListSearchTable extends Component {
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
    if (this.props.searchPages.length === 0) {
      return (
        <Alert type="warning">
          <strong><FormattedMessage id="pages.noPageFound" /></strong>
        </Alert>
      );
    }

    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };
    return (
      <div>
        <table className="PageListSearchTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th width="20%"><FormattedMessage id="app.code" /></th>
              <th><FormattedMessage id="app.title" /></th>
              <th className="text-center" width="10%">
                <FormattedMessage id="app.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
        />
      </div>);
  }

  renderRows() {
    const { locale } = this.props;
    return (

      this.props.searchPages.map(page => (
        <tr key={page.code}>
          <td className="PageListSearchRow__td">{page.code}</td>
          <td className="PageListSearchRow__td">{page.titles[locale]}</td>
          <td className="PageListSearchRow__td text-center">
            <PageTreeActionMenu
              page={page}
              onClickAdd={this.props.onClickAdd}
              onClickEdit={this.props.onClickEdit}
              onClickConfigure={this.props.onClickConfigure}
              onClickDetails={this.props.onClickDetails}
              onClickClone={this.props.onClickClone}
              onClickDelete={this.props.onClickDelete}
              onClickPublish={this.props.onClickPublish}
              onClickUnpublish={this.props.onClickUnPublish}
            />
          </td>
        </tr>
      ))
    );
  }

  render() {
    return (
      <div className="PageListSearchTable">
        <Spinner loading={!!this.props.loading} >
          {this.renderTable()}
        </Spinner>
        <DeletePageModalContainer />
      </div>
    );
  }
}

PageListSearchTable.propTypes = {
  onWillMount: PropTypes.func,
  locale: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  searchPages: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickConfigure: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickDetails: PropTypes.func.isRequired,
  onClickClone: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickUnPublish: PropTypes.func.isRequired,

};

PageListSearchTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  searchPages: [],
};

export default PageListSearchTable;
