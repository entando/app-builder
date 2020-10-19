import { connect } from 'react-redux';
import ContentWidget from 'ui/pages/config/ContentWidget';
import { setSearchFilter } from 'state/page-config/actions';
import { getGroupedWidgetList } from 'state/page-config/selectors';

export const mapStateToProps = state => ({
  widgetList: getGroupedWidgetList(state),
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
