import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDatabaseDumpTable } from 'state/database/actions';
import DatabaseDumpTablePage from 'ui/database/dump/DatabaseDumpTablePage';
import { getTableDumpData } from 'state/database/selectors';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = state => ({
  dumpData: getTableDumpData(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchDumpTable: () => {
    const { match: { params: { datasource, tableName, dumpCode } = {} } = {} } = ownProps;
    if (dumpCode && datasource && tableName) {
      dispatch(fetchDatabaseDumpTable(dumpCode, datasource, tableName));
      dispatch(setVisibleModal('DatabaseDumpPage'));
    }
  },
});

const DatabaseDumpTablePageContainer =
withRouter(connect(mapStateToProps, mapDispatchToProps)(DatabaseDumpTablePage));
export default withPermissions(ROLE_SUPERUSER)(DatabaseDumpTablePageContainer);
