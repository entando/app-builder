import { connect } from 'react-redux';

import { getWidgetsTotal } from 'state/widgets/selectors';
import { getPageTemplatesTotal } from 'state/page-templates/selectors';
import { fetchWidgetsTotal } from 'state/widgets/actions';
import { fetchPageTemplatesTotal } from 'state/page-templates/actions';
import UxPatterns from 'ui/dashboard/UxPatterns';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetsTotal());
    dispatch(fetchPageTemplatesTotal());
  },
});

export const mapStateToProps = state => (
  {
    widgets: getWidgetsTotal(state),
    pageTemplates: getPageTemplatesTotal(state),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UxPatterns);
