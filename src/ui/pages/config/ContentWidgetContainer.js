import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { getWidgetList } from 'state/page-config/selectors';

const mapStateToProps = state => ({
  widgetList: getWidgetList(state),
});


const mapDispatchToProps = () => ({
  filterWidget: () => {},
});


const ContentWidgetContainer = connect(mapStateToProps, mapDispatchToProps)(ContentWidget);
export default ContentWidgetContainer;
