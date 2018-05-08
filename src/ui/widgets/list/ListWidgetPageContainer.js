import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { fetchWidgetList, sendDeleteWidgets } from 'state/widgets/actions';
import { getTypologyWidgetList } from 'state/widgets/selectors';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { getLocale } from 'state/locale/selectors';


export const mapStateToProps = state => ({
  loading: getLoading(state).widgets,
  widgetList: getTypologyWidgetList(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetList());
  },
  onDelete: (widgetCode) => {
    dispatch(sendDeleteWidgets(widgetCode));
  },
});

const ListWidgetPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListWidgetPage);

export default ListWidgetPageContainer;
