import { connect } from 'react-redux';

import { getActiveLanguages } from 'state/languages/selectors';
import { fetchLanguages } from 'state/languages/actions';
import Languages from 'ui/dashboard/Languages';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchLanguages({ page: 1, pageSize: 0 })),
});

export const mapStateToProps = state => ({
  activeLanguages: getActiveLanguages(state).length,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Languages);
