import { connect } from 'react-redux';

import { getWidgetsTotal } from 'state/widgets/selectors';
import { getPageModelsTotal } from 'state/page-models/selectors';
import { fetchWidgetsTotal } from 'state/widgets/actions';
import { fetchPageModelsTotal } from 'state/page-models/actions';
import UxPatterns from 'ui/dashboard/UxPatterns';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetsTotal());
    dispatch(fetchPageModelsTotal());
  },
});

export const mapStateToProps = state => (
  {
    widgets: getWidgetsTotal(state),
    pageModels: getPageModelsTotal(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UxPatterns);
