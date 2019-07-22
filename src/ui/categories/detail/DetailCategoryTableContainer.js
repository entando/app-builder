import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailCategoryTable from 'ui/categories/detail/DetailCategoryTable';
import { fetchCategoryDetail } from 'state/categories/actions';
import { getSelected, getReferenceKeyList, getReferenceMap } from 'state/categories/selectors';

export const mapStateToProps = (state, { match: { params } }) => ({
  category: getSelected(state),
  referenceList: getReferenceKeyList(state),
  referenceMap: getReferenceMap(state),
  categoryCode: params.categoryCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ categoryCode }) => {
    dispatch(fetchCategoryDetail(categoryCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCategoryTable));
