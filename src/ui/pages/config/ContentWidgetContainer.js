import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { setSearchFilter } from 'state/page-config/actions';
import { getWidgetList } from 'state/page-config/selectors';

const mapStateToProps = state => ({
  widgetList: getWidgetList(state),
});


const mapDispatchToProps = dispatch => ({
  filterWidget: value => dispatch(setSearchFilter(value)),
});


const ContentWidgetContainer = connect(mapStateToProps, mapDispatchToProps)(ContentWidget);
export default ContentWidgetContainer;
