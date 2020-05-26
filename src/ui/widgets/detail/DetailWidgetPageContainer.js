import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchWidgetInfo } from 'state/widgets/actions';
import { getWidgetInfo } from 'state/widgets/selectors';
import DetailWidgetPage from 'ui/widgets/detail/DetailWidgetPage';
import { getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const mapStateToProps = state => ({
  widgetInfo: getWidgetInfo(state),
  defaultLanguage: getDefaultLanguage(state),
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchWidgetInfo(params.widgetCode));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withPermissions(ROLE_SUPERUSER)(DetailWidgetPage)));
