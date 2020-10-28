import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDatabaseDumpTable } from 'state/database/actions';
import DatabaseDumpTablePage from 'ui/database/dump/DatabaseDumpTablePage';
import { getTableDumpData } from 'state/database/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const mapStateToProps = state => ({
  dumpData: getTableDumpData(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    const { match: { params: { datasource, tableName, dumpCode } = {} } = {} } = ownProps;
    dispatch(fetchDatabaseDumpTable(dumpCode, datasource, tableName));
  },
});

const DatabaseDumpTablePageContainer =
withRouter(connect(mapStateToProps, mapDispatchToProps)(DatabaseDumpTablePage));
export default withPermissions(ROLE_SUPERUSER)(DatabaseDumpTablePageContainer);
