import { connect } from 'react-redux';
import { getDomain } from '@entando/apimanager';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getPagination } from 'state/pagination/selectors';
import { NAMESPACE_VERSIONING } from 'state/pagination/const';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { getResourceVersioningList } from 'state/versioning/selectors';
import {
  setSelectedVersioningType,
  fetchResourceVersionings,
} from 'state/versioning/actions';
import { REMOVE_RESOURCE_MODAL_ID } from 'ui/versioning/common/RemoveResourceModal';
import { RECOVER_RESOURCE_MODAL_ID } from 'ui/versioning/common/RecoverResourceModal';
import AttachmentsList from 'ui/versioning/attachments/AttachmentsList';

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
    attachments: getResourceVersioningList(state),
    domain: getDomain(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('Attach'));
    dispatch(fetchResourceVersionings(page));
  },
  fetchAttachments: (pagination = { page: 1, pageSize: 10 }) => {
    dispatch(fetchResourceVersionings(pagination));
  },
  removeAttachment: (attachment) => {
    dispatch(setVisibleModal(REMOVE_RESOURCE_MODAL_ID));
    dispatch(setInfo(attachment));
  },
  recoverAttachment: (attachment) => {
    dispatch(setVisibleModal(RECOVER_RESOURCE_MODAL_ID));
    dispatch(setInfo(attachment));
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

const AttachmentsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachmentsList);

export default AttachmentsListContainer;
