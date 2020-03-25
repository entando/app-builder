import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { fetchWidgetList } from 'state/widgets/actions';
import { getTypologyWidgetList } from 'state/widgets/selectors';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { getLocale } from 'state/locale/selectors';
import { MODAL_ID } from 'ui/widgets/list/DeleteWidgetModal';
import { setVisibleModal, setInfo } from 'state/modal/actions';


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
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'widget', code: widgetCode }));
  },
});

const ListWidgetPageContainer = connect(mapStateToProps, mapDispatchToProps)(ListWidgetPage);

export default ListWidgetPageContainer;
