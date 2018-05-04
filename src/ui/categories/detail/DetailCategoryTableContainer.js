import { connect } from 'react-redux';
import { getParams } from '@entando/router';
import DetailCategoryTable from 'ui/categories/detail/DetailCategoryTable';
import { fetchCategoryDetail } from 'state/categories/actions';
import { getSelected, getReferenceKeyList, getReferenceMap } from 'state/categories/selectors';

export const mapStateToProps = state => ({
  category: getSelected(state),
  referenceList: getReferenceKeyList(state),
  referenceMap: getReferenceMap(state),
  categoryCode: getParams(state).categoryCode,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: ({ categoryCode }) => {
    dispatch(fetchCategoryDetail(categoryCode));
  },
});

const DetailCategoryTableContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailCategoryTable);
export default DetailCategoryTableContainer;
