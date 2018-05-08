import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { setSearchFilter, changeViewList } from 'state/page-config/actions';
import { getGroupedWidgetList, getViewList } from 'state/page-config/selectors';

export const mapStateToProps = state => ({
  widgetList: getGroupedWidgetList(state),
  viewList: getViewList(state),
});


export const mapDispatchToProps = dispatch => ({
  filterWidget: value => dispatch(setSearchFilter(value)),
  changeViewList: view => dispatch(changeViewList(view)),
});


const ContentWidgetContainer = connect(mapStateToProps, mapDispatchToProps)(ContentWidget);
export default ContentWidgetContainer;
