import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';
import { fetchWidgetList } from 'state/widgets/actions';
import { getGroupedWidgets, getWidgetGroupingList } from 'state/widgets/selectors';
import ListWidgetPage from 'ui/widgets/list/ListWidgetPage';
import { getLocale } from 'state/locale/selectors';
import { MODAL_ID } from 'ui/widgets/list/DeleteWidgetModal';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { routeConverter } from '@entando/utils/dist/routeConverter';
import { ROUTE_WIDGET_EDIT, ROUTE_WIDGET_NEW_USERWIDGET } from 'app-init/router';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';


export const mapStateToProps = state => ({
  loading: getLoading(state).widgets,
  groupedWidgets: getGroupedWidgets(state),
  widgetGroupingList: getWidgetGroupingList(state),
  locale: getLocale(state),
  columnOrder: getColumnOrder(state, 'widgetList'),
});

export const mapDispatchToProps = (dispatch, { history }) => ({
  onWillMount: () => {
    dispatch(fetchWidgetList());
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'widgetList')),
  onDelete: (widgetCode) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'widget', code: widgetCode }));
  },
  onEdit: (widgetCode) => {
    history.push(routeConverter(ROUTE_WIDGET_EDIT, { widgetCode }));
  },
  onNewUserWidget: (widgetCode) => {
    history.push(routeConverter(ROUTE_WIDGET_NEW_USERWIDGET, { widgetCode }));
  },
});

const ListWidgetPageContainer =
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ListWidgetPage));

export default withPermissions(SUPERUSER_PERMISSION)(ListWidgetPageContainer);
