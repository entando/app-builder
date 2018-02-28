import { connect } from 'react-redux';
import { fetchWidgetListRow } from 'state/widget-list/actions';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetListRow());
  },
});

const ListWidgetPageContainer = connect(null, mapDispatchToProps)(ListWidgetPage);

export default ListWidgetPageContainer;
