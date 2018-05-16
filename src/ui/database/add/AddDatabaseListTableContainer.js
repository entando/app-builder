import { connect } from 'react-redux';
import AddDatabaseListTable from 'ui/database/add/AddDatabaseListTable';
import { getDatabaseInit } from 'state/database/selectors';
import { sendPostDatabaseStartBackup } from 'state/database/actions';

export const mapStateToProps = state => ({
  tables: getDatabaseInit(state),
});

export const mapDispatchToProps = dispatch => ({
  onClickStartBackup: () => dispatch(sendPostDatabaseStartBackup()),
});

const AddDatabaseListTableContainer =
  connect(mapStateToProps, mapDispatchToProps)(AddDatabaseListTable);
export default AddDatabaseListTableContainer;
