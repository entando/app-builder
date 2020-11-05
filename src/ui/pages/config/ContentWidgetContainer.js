import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { setSearchFilter } from 'state/page-config/actions';
import { getGroupedWidgets, getWidgetGroupingList } from 'state/widgets/selectors';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  groupedWidgets: getGroupedWidgets(state),
  widgetGroupingList: getWidgetGroupingList(state),
  locale: getLocale(state),
});


export const mapDispatchToProps = dispatch => ({
  filterWidget: value => dispatch(setSearchFilter(value)),
});


const ContentWidgetContainer = connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(ContentWidget);
export default ContentWidgetContainer;
