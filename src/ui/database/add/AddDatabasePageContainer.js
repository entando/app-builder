import { connect } from 'react-redux';
import AddDatabasePage from 'ui/database/add/AddDatabasePage';
import { fetchDatabaseInitBackup } from 'state/database/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(fetchDatabaseInitBackup()),
});


const AddDatabasePageContainer = connect(null, mapDispatchToProps)(AddDatabasePage);
export default AddDatabasePageContainer;
