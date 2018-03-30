import { connect } from 'react-redux';
import { fetchWidgetList } from 'state/widgets/actions';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  loading: getLoading(state).widgets,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetList());
  },
});

const ListWidgetPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListWidgetPage);

export default ListWidgetPageContainer;
