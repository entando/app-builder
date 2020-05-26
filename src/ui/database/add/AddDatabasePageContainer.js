import { connect } from 'react-redux';
import AddDatabasePage from 'ui/database/add/AddDatabasePage';
import { fetchDatabaseInitBackup } from 'state/database/actions';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchDatabaseInitBackup()),
});


const AddDatabasePageContainer = withPermissions(ROLE_SUPERUSER)(connect(
  null,
  mapDispatchToProps,
)(AddDatabasePage));
export default AddDatabasePageContainer;
