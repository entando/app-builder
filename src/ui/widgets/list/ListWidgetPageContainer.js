import { connect } from 'react-redux';
import { fetchWidgetList } from 'state/widgets/actions';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetList());
  },
});

const ListWidgetPageContainer = connect(null, mapDispatchToProps)(ListWidgetPage);

export default ListWidgetPageContainer;
