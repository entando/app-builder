import { connect } from 'react-redux';
import { fetchDatabaseDumpTable } from 'state/database/actions';
import DatabaseDumpTablePage from 'ui/database/dump/DatabaseDumpTablePage';
import { getTableDumpData } from 'state/database/selectors';

export const mapStateToProps = state => ({
  dumpData: getTableDumpData(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDatabaseDumpTable());
  },
});

const DatabaseDumpTablePageContainer =
  connect(mapStateToProps, mapDispatchToProps)(DatabaseDumpTablePage);
export default DatabaseDumpTablePageContainer;
