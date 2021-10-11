import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Spinner, Paginator } from 'patternfly-react';
import SingleContentVersioningHistoryItem from 'ui/versioning/SingleContentVersioningHistoryItem';
import RestoreContentVersionModalContainer from 'ui/versioning/RestoreContentVersionModalContainer';
import DeleteContentVersionModalContainer from 'ui/versioning/DeleteContentVersionModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class SingleContentVersioningHistory extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  changePage(page) {
    const { fetchVersioningList, pageSize } = this.props;
    fetchVersioningList({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchVersioningList } = this.props;
    fetchVersioningList({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      versioningList,
      loading,
      page,
      pageSize,
      totalItems,
      onClickRestore,
      onClickDelete,
    } = this.props;
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const renderRows = versioningList
      .map(item => (
        <SingleContentVersioningHistoryItem
          key={item.id}
          onClickRestore={onClickRestore}
          onClickDelete={onClickDelete}
          {...item}
        />
      ));

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const renderData = versioningList.length === 0 ? (
      <FormattedMessage id="cms.versioning.noPreviousVersioning" defaultMessage="No previous revision." />
    ) : (
      <Fragment>
        <table className="table table-striped table-bordered table-hover VersioningList__table">
          <thead>
            <tr>
              <th width="10%" className="text-center">
                <FormattedMessage id="cms.versioning.list.version" defaultMessage="Version" />
              </th>
              <th width="30%">
                <FormattedMessage id="cms.versioning.list.description" defaultMessage="Description" />
              </th>
              <th width="30%" className="text-center">
                <FormattedMessage id="cms.versioning.list.lastModify" defaultMessage="Last Modified" />
              </th>
              <th width="10%" className="text-center">
                <FormattedMessage id="cms.versioning.list.editor" defaultMessage="Editor" />
              </th>
              <th width="10%" className="text-center">
                <FormattedMessage id="cms.versioning.list.status" defaultMessage="Status" />
              </th>
              <th width="10%" className="text-center">
                <FormattedMessage id="cms.versioning.list.actions" defaultMessage="Actions" />
              </th>
            </tr>
          </thead>
          <tbody>{renderRows}</tbody>
        </table>
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
          messages={messages}
        />
      </Fragment>
    );
    return (
      <div className="VersioningList__wrap">
        <Spinner loading={!!loading}>
          {renderData}
        </Spinner>
        <DeleteContentVersionModalContainer />
        <RestoreContentVersionModalContainer />
      </div>
    );
  }
}

SingleContentVersioningHistory.propTypes = {
  intl: intlShape.isRequired,
  versioningList: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  fetchVersioningList: PropTypes.func.isRequired,
  onClickRestore: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

SingleContentVersioningHistory.defaultProps = {
  loading: false,
  versioningList: [],
};

export default injectIntl(SingleContentVersioningHistory);
