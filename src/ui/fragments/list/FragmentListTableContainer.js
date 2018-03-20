import { connect } from 'react-redux';

import { fetchFragments } from 'state/fragments/actions';
import { getFragmentList } from 'state/fragments/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import FragmentListTable from 'ui/fragments/list/FragmentListTable';

export const mapStateToProps = state => (
  {
    fragments: getFragmentList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchFragments(page));
  },
});

const FragmentListTableContainer = connect(mapStateToProps, mapDispatchToProps)(FragmentListTable);

export default FragmentListTableContainer;
