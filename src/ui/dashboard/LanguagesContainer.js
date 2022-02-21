import { connect } from 'react-redux';

import { getActiveLanguages } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';
import { withPermissionValues } from 'ui/auth/withPermissions';

import Languages from 'ui/dashboard/Languages';

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(fetchLanguages({ page: 1, pageSize: 0 })),
});

export const mapStateToProps = state => ({
  activeLanguages: getActiveLanguages(state).length,
});

const LanguagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Languages);

export default withPermissionValues(LanguagesContainer);
