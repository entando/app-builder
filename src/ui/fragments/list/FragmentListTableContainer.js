import { connect } from 'react-redux';

import { fetchFragments } from 'state/fragment-list/actions';
import { getFragmentList } from 'state/fragment-list/selectors';
import FragmentListTable from 'ui/fragments/list/FragmentListTable';

export const mapStateToProps = state => (
  {
    fragments: getFragmentList(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFragments());
  },
});

const FragmentListTableContainer = connect(mapStateToProps, mapDispatchToProps)(FragmentListTable);

export default FragmentListTableContainer;
