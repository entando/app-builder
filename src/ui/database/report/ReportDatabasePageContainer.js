import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLoading } from 'state/loading/selectors';
import { fetchDatabaseReportBackup } from 'state/database/actions';
import { getDatabaseReportBackup } from 'state/database/selectors';
import ReportDatabasePage from 'ui/database/report/ReportDatabasePage';

export const mapStateToProps = state => ({
  report: getDatabaseReportBackup(state),
  loading: getLoading(state).database,
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchDatabaseReportBackup(params.dumpCode));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportDatabasePage));
