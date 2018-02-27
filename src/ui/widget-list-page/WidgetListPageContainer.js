import { connect } from 'react-redux';
import { fetchWidgetListRow } from 'state/widget-list/actions';
import WidgetListPage from 'ui/widget-list-page/WidgetListPage';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetListRow());
  },
});

const WidgetListPageContainer = connect(null, mapDispatchToProps)(WidgetListPage);

export default WidgetListPageContainer;
