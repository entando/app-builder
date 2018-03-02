import { connect } from 'react-redux';
import { fetchWidgetListRow } from 'state/widget-list/actions';
import ListFragmentPage from 'ui/fragments/list/ListFragmentPage';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetListRow());
  },
});

const ListFragmentPageContainer = connect(null, mapDispatchToProps)(ListFragmentPage);

export default ListFragmentPageContainer;
