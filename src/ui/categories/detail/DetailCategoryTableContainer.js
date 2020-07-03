import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailCategoryTable, { CONTENT_REFERENCES_KEY, RESOURCE_REFERENCES_KEY } from 'ui/categories/detail/DetailCategoryTable';
import { fetchCategoryDetail, fetchReferences } from 'state/categories/actions';
import { getPagination } from 'state/pagination/selectors';
import { getSelected, getReferenceKeyList, getReferenceMap } from 'state/categories/selectors';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  contentsPagination: getPagination(state, CONTENT_REFERENCES_KEY),
  resourcesPagination: getPagination(state, RESOURCE_REFERENCES_KEY),
  category: getSelected(state),
  referenceList: getReferenceKeyList(state),
  referenceMap: getReferenceMap(state),
  categoryCode: params.categoryCode,
  loading: getLoading(state).categoryDetail,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  componentDidMount: ({ categoryCode }) => {
    dispatch(fetchCategoryDetail(categoryCode));
  },
  onPageChange: (referenceKey, page) => {
    const { match: { params: { categoryCode } = {} } = {} } = ownProps;
    dispatch(fetchReferences(categoryCode, referenceKey, page));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCategoryTable));
