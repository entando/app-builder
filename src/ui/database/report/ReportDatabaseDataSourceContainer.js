import { connect } from 'react-redux';
import ReportDatabaseDataSource from 'ui/database/report/ReportDatabaseDataSource';
import { setDumpTable } from 'state/database/actions';

export const mapDispatchToProps = dispatch => ({
  onClickDump: (datasource, tableName) => dispatch(setDumpTable({ datasource, tableName })),
});

const ReportDatabaseDataSourceContainer =
 connect(null, mapDispatchToProps)(ReportDatabaseDataSource);
export default ReportDatabaseDataSourceContainer;
