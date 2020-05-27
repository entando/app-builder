import { connect } from 'react-redux';
import AddDatabasePage from 'ui/database/add/AddDatabasePage';
import { fetchDatabaseInitBackup } from 'state/database/actions';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchDatabaseInitBackup()),
});


const AddDatabasePageContainer = connect(
  null,
  mapDispatchToProps,
)(AddDatabasePage);
export default withPermissions(ROLE_SUPERUSER)(AddDatabasePageContainer);
