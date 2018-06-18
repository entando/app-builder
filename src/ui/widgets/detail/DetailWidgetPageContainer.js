import { connect } from 'react-redux';
import { fetchWidgetInfo } from 'state/widgets/actions';
import { getWidgetInfo } from 'state/widgets/selectors';
import DetailWidgetPage from 'ui/widgets/detail/DetailWidgetPage';

export const mapStateToProps = state => ({
  widgetInfo: getWidgetInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchWidgetInfo()),
});

const DetailWidgetPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailWidgetPage);
export default DetailWidgetPageContainer;
