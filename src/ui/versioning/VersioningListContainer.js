import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { getLoading } from 'state/loading/selectors';
import { getPagination } from 'state/pagination/selectors';
import { NAMESPACE_VERSIONING } from 'state/pagination/const';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';

import VersioningList from 'ui/versioning/VersioningList';
import { getVersioningList } from 'state/versioning/selectors';
import { fetchVersionings, setSelectedVersioningType } from 'state/versioning/actions';

const noPage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state) => {
  const {
    page, totalItems, pageSize,
  } = getPagination(state, NAMESPACE_VERSIONING);
  return {
    loading: getLoading(state).versionings,
    page,
    totalItems,
    pageSize,
    contentTypes: getContentTypeList(state),
    versioningList: getVersioningList(state),
    columnOrder: getColumnOrder(state, 'versioningList'),
  };
};

export const mapDispatchToProps = dispatch => ({
  onDidMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(setSelectedVersioningType('contents'));
    dispatch(fetchVersionings(page));
    dispatch(fetchContentTypeListPaged(noPage));
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'versioningList')),
  fetchVersioningList: (page) => {
    dispatch(fetchVersionings(page));
  },
  onSubmit: (params) => {
    const like = FILTER_OPERATORS.LIKE;
    const { description, type: contentType } = params;
    const formValues = {
      ...(description && { description }),
      ...(contentType && { contentType }),
    };
    const operators = {
      ...(contentType && { author: like }),
      ...(description && { status: like }),
    };
    const queryString = convertToQueryString({
      formValues,
      operators,
    });
    dispatch(fetchVersionings({ page: 1, pageSize: 10 }, queryString));
  },
});

const VersioningListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningList);

export default VersioningListContainer;
