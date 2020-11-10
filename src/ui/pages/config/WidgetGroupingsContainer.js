import { connect } from 'react-redux';
import WidgetGroupings from 'ui/pages/config/WidgetGroupings';
import { setSearchFilter } from 'state/page-config/actions';
import { getGroupedWidgets, getSearchFilter, getWidgetGroupingList } from 'state/page-config/selectors';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  searchFilter: getSearchFilter(state),
  groupedWidgets: getGroupedWidgets(state),
  widgetGroupingList: getWidgetGroupingList(state),
  locale: getLocale(state),
});


export const mapDispatchToProps = dispatch => ({
  filterWidget: value => dispatch(setSearchFilter(value)),
});


const WidgetGroupingsContainer = connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(WidgetGroupings);

export default WidgetGroupingsContainer;
