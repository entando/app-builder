import { connect } from 'react-redux';

import { getWidgetsTotal } from 'state/widgets/selectors';
import { getPageTemplatesTotal } from 'state/page-templates/selectors';
import { fetchWidgetsTotal } from 'state/widgets/thunks';
import { fetchPageTemplatesTotal } from 'state/page-templates/actions';
import { withPermissionValues } from 'ui/auth/withPermissions';
import UxPatterns from 'ui/dashboard/UxPatterns';

export const mapStateToProps = state => ({
  widgets: getWidgetsTotal(state),
  pageTemplates: getPageTemplatesTotal(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchWidgetsTotal());
    dispatch(fetchPageTemplatesTotal());
  },
});

const UxPatternsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UxPatterns);

export default withPermissionValues(UxPatternsContainer);
