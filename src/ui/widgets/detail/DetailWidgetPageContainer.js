import { connect } from 'react-redux';
import { fetchWidgetInfo } from 'state/widgets/actions';
import { getWidgetInfo } from 'state/widgets/selectors';
import DetailWidgetPage from 'ui/widgets/detail/DetailWidgetPage';
import { getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';

export const mapStateToProps = state => ({
  widgetInfo: getWidgetInfo(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetInfo());
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
});

const DetailWidgetPageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DetailWidgetPage);
export default DetailWidgetPageContainer;
