import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
  Paginator,
} from 'patternfly-react';
import { injectIntl, intlShape } from 'react-intl';
import AttachmentsListItem from 'ui/versioning/attachments/AttachmentsListItem';
import FileVersioningSearchForm from 'ui/versioning/common/FileVersioningSearchForm';
import RemoveResourceModalContainer from 'ui/versioning/common/RemoveResourceModalContainer';
import RecoverResourceModalContainer from 'ui/versioning/common/RecoverResourceModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class AttachmentsList extends React.Component {
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
    const { fetchAttachments, pagination: { pageSize } } = this.props;
    fetchAttachments({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchAttachments } = this.props;
    fetchAttachments({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      loading,
      attachments,
      pagination: {
        page,
        pageSize,
      },
      totalItems,
      onSubmit,
      removeAttachment,
      recoverAttachment,
      domain,
    } = this.props;

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <Spinner loading={!!loading}>
        <FileVersioningSearchForm onSubmit={onSubmit} />
        <ListView>
          {attachments.map(attachment => (
            <AttachmentsListItem
              key={attachment.id}
              domain={domain}
              attachment={attachment}
              onClickRemove={removeAttachment}
              onClickRecover={recoverAttachment}
            />
          ))}
          <Paginator
            pagination={{
              page,
              perPage: pageSize,
              perPageOptions,
            }}
            viewType="list"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
        </ListView>
        <RecoverResourceModalContainer resourceType="file" />
        <RemoveResourceModalContainer resourceType="file" />
      </Spinner>
    );
  }
}

AttachmentsList.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  fetchAttachments: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  attachments: PropTypes.arrayOf(PropTypes.shape()),
  removeAttachment: PropTypes.func,
  recoverAttachment: PropTypes.func,
  totalItems: PropTypes.number,
  domain: PropTypes.string,
};

AttachmentsList.defaultProps = {
  onDidMount: () => {},
  fetchAttachments: () => {},
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  attachments: [],
  totalItems: 0,
  removeAttachment: () => {},
  recoverAttachment: () => {},
  domain: '',
};

export default injectIntl(AttachmentsList);
