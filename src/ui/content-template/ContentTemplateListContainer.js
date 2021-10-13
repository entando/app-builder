import { connect } from 'react-redux';
import { getContentTemplateList, getContentTemplateFilters } from 'state/content-template/selectors';
import {
  pageDefault,
  setListFilterProps,
  fetchContentTemplateListPaged,
} from 'state/content-template/actions';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getPagination } from 'state/pagination/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { NAMESPACE_CONTENT_TEMPLATES } from 'state/pagination/const';

import ContentTemplateList from 'ui/content-template/ContentTemplateList';
import { MODAL_ID } from 'ui/content-template/DeleteContentTemplateModal';

export const mapStateToProps = (state) => {
  const {
    page, totalItems, pageSize, lastPage,
  } = getPagination(state, NAMESPACE_CONTENT_TEMPLATES);
  return {
    contentTemplates: getContentTemplateList(state),
    loading: getLoading(state).contentTemplateList,
    page,
    totalItems,
    pageSize,
    lastPage,
    filters: getContentTemplateFilters(state),
    columnOrder: getColumnOrder(state, 'contentTemplates'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(setListFilterProps({}));
    dispatch(fetchContentTemplateListPaged(pageDefault));
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'contentTemplates')),
  fetchList: (page = pageDefault) => (
    dispatch(fetchContentTemplateListPaged(page))
  ),
  onClickDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentTemplateListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentTemplateList);

export default ContentTemplateListContainer;
