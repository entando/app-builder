import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { fetchSingleVersioningHistory, setSelectedVersioningType } from 'state/versioning/actions';
import { getVersioningList } from 'state/versioning/selectors';
import { getPagination } from 'state/pagination/selectors';
import { NAMESPACE_VERSION_HISTORY } from 'state/pagination/const';

import SingleContentVersioningHistory from 'ui/versioning/SingleContentVersioningHistory';
import { DELETE_CONTENT_VERSION_MODAL_ID } from 'ui/versioning/DeleteContentVersionModal';
import { RESTORE_CONTENT_VERSION_MODAL_ID } from 'ui/versioning/RestoreContentVersionModal';

export const mapStateToProps = (state) => {
  const {
    page, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_VERSION_HISTORY);
  return {
    loading: getLoading(state).versionings,
    page,
    totalItems,
    pageSize,
    versioningList: getVersioningList(state),
  };
};

export const mapDispatchToProps = (dispatch, { id, match: { params } }) => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchSingleVersioningHistory(params.contentId || id, page));
  },
  fetchVersioningList: (page) => {
    dispatch(fetchSingleVersioningHistory(params.contentId || id, page));
  },
  onClickRestore: (item) => {
    dispatch(setVisibleModal(RESTORE_CONTENT_VERSION_MODAL_ID));
    dispatch(setInfo(item));
  },
  onClickDelete: (item) => {
    dispatch(setVisibleModal(DELETE_CONTENT_VERSION_MODAL_ID));
    dispatch(setInfo(item));
  },
});

const SingleContentVersioningHistoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentVersioningHistory);

export default withRouter(SingleContentVersioningHistoryContainer);
