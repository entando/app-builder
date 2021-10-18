import React from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
  ListView,
  PaginationRow,
} from 'patternfly-react';
import { injectIntl, intlShape } from 'react-intl';
import ImagesListItem from 'ui/versioning/images/ImagesListItem';
import FileVersioningSearchForm from 'ui/versioning/common/FileVersioningSearchForm';
import RemoveResourceModalContainer from 'ui/versioning/common/RemoveResourceModalContainer';
import RecoverResourceModalContainer from 'ui/versioning/common/RecoverResourceModalContainer';
import paginatorMessages from 'ui/common/paginatorMessages';

const perPageOptions = [5, 10, 15, 25, 50];

class ImagesList extends React.Component {
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
    const { fetchImages, pagination: { pageSize } } = this.props;
    fetchImages({ page, pageSize });
  }

  changePageSize(pageSize) {
    const { fetchImages } = this.props;
    fetchImages({ page: 1, pageSize });
  }

  render() {
    const {
      intl,
      loading,
      images,
      pagination: {
        page,
        pageSize,
      },
      totalItems,
      lastPage,
      onSubmit,
      removeImage,
      recoverImage,
      domain,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions,
    };

    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <Spinner loading={!!loading}>
        <FileVersioningSearchForm onSubmit={onSubmit} />
        <ListView>
          {images.map(image => (
            <ImagesListItem
              key={image.id}
              image={image}
              onClickRemove={removeImage}
              onClickRecover={recoverImage}
              domain={domain}
            />
          ))}
          <PaginationRow
            itemCount={totalItems}
            itemsStart={itemsStart}
            itemsEnd={itemsEnd}
            viewType="list"
            pagination={pagination}
            amountOfPages={lastPage}
            pageInputValue={page}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            onFirstPage={() => this.changePage(1)}
            onPreviousPage={() => this.changePage(page - 1)}
            onPageInput={this.onPageInput}
            onNextPage={() => this.changePage(page + 1)}
            onLastPage={() => this.changePage(lastPage)}
            messages={messages}
          />
        </ListView>
        <RecoverResourceModalContainer resourceType="image" />
        <RemoveResourceModalContainer resourceType="image" />
      </Spinner>
    );
  }
}

ImagesList.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  fetchImages: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  images: PropTypes.arrayOf(PropTypes.shape()),
  removeImage: PropTypes.func,
  recoverImage: PropTypes.func,
  totalItems: PropTypes.number,
  lastPage: PropTypes.number.isRequired,
  domain: PropTypes.string,
};

ImagesList.defaultProps = {
  onDidMount: () => {},
  fetchImages: () => {},
  loading: false,
  pagination: {
    page: 1,
    pageSize: 10,
  },
  images: [],
  totalItems: 0,
  removeImage: () => {},
  recoverImage: () => {},
  domain: '',
};

export default injectIntl(ImagesList);
