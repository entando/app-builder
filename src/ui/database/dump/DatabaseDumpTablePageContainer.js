import { connect } from 'react-redux';
import { fetchDatabaseDumpTable } from 'state/database/actions';
import DatabaseDumpTablePage from 'ui/database/dump/DatabaseDumpTablePage';

export const mapStateToProps = state => ({
  datasource:
  table:
})

export const mapDispatchToProps = dispatch => ({
  onWillMount: (datasource, table) => {
    dispatch(fetchDatabaseDumpTable(datasource, table));
  },
});

const DatabaseDumpTablePageContainer = connect(mapStateToProps, mapDispatchToProps)(DatabaseDumpTablePage);
export default DatabaseDumpTablePageContainer;
