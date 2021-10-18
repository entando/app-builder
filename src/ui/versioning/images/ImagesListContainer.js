import { connect } from 'react-redux';
import { getDomain } from '@entando/apimanager';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { getPagination } from 'state/pagination/selectors';
import { NAMESPACE_VERSIONING } from 'state/pagination/const';
import { getResourceVersioningList } from 'state/versioning/selectors';
import {
  setSelectedVersioningType,
  fetchResourceVersionings,
} from 'state/versioning/actions';
import ImagesList from 'ui/versioning/images/ImagesList';
import { REMOVE_RESOURCE_MODAL_ID } from 'ui/versioning/common/RemoveResourceModal';
import { RECOVER_RESOURCE_MODAL_ID } from 'ui/versioning/common/RecoverResourceModal';

export const mapStateToProps = (state) => {
  const {
    page, totalItems, pageSize, lastPage,
  } = getPagination(state, NAMESPACE_VERSIONING);

  return {
    loading: getLoading(state).versionings,
    pagination: {
      page,
      pageSize,
    },
    lastPage,
    totalItems,
    images: getResourceVersioningList(state),
    domain: getDomain(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('Image'));
    dispatch(fetchResourceVersionings(page));
  },
  fetchImages: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchResourceVersionings(page));
  },
  removeImage: (image) => {
    dispatch(setVisibleModal(REMOVE_RESOURCE_MODAL_ID));
    dispatch(setInfo(image));
  },
  recoverImage: (image) => {
    dispatch(setVisibleModal(RECOVER_RESOURCE_MODAL_ID));
    dispatch(setInfo(image));
  },
  onSubmit: (params) => {
    const like = FILTER_OPERATORS.LIKE;
    const { description } = params;
    const formValues = {
      ...(description && { description }),
    };
    const operators = {
      ...(description && { description: like }),
    };
    const queryString = convertToQueryString({
      formValues,
      operators,
    }).replace('?', '&');
    dispatch(fetchResourceVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const ImagesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesList);

export default ImagesListContainer;
