import { connect } from 'react-redux';
import { getContentTypeList } from 'state/content-type/selectors';
import { fetchContentTypeListPaged, sendPostRefreshContentType } from 'state/content-type/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getPagination } from 'state/pagination/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { NAMESPACE_CONTENT_TYPES } from 'state/pagination/const';

import ContentTypeList from 'ui/content-type/ContentTypeList';
import { MODAL_ID } from 'ui/content-type/DeleteContentTypeModal';

export const mapStateToProps = (state) => {
  const {
    page, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_CONTENT_TYPES);
  return {
    contentTypes: getContentTypeList(state),
    loading: getLoading(state).contentTypeList,
    page,
    totalItems,
    pageSize,
    columnOrder: getColumnOrder(state, 'contentTypes'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => dispatch(fetchContentTypeListPaged(page)),
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'contentTypes')),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
  onClickReload: (code) => {
    dispatch(sendPostRefreshContentType(code));
  },
});

const ContentTypeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentTypeList);

export default ContentTypeListContainer;
