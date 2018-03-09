import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { setSearchFilter, changeViewList } from 'state/page-config/actions';
import { getWidgetList, getViewList } from 'state/page-config/selectors';


const mapStateToProps = state => ({
  widgetList: getWidgetList(state),
  viewList: getViewList(state),
});


const mapDispatchToProps = dispatch => ({
  filterWidget: value => dispatch(setSearchFilter(value)),
  changeViewList: view => dispatch(changeViewList(view)),
});


const ContentWidgetContainer = connect(mapStateToProps, mapDispatchToProps)(ContentWidget);
export default ContentWidgetContainer;
