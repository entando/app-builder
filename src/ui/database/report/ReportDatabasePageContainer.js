import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { fetchDatabaseReportBackup } from 'state/database/actions';
import { getDatabaseReportBackup } from 'state/database/selectors';
import ReportDatabasePage from 'ui/database/report/ReportDatabasePage';

export const mapStateToProps = state => ({
  report: getDatabaseReportBackup(state),
  loading: getLoading(state).database,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchDatabaseReportBackup());
  },
});

const ReportDatabasePageContainer =
  connect(mapStateToProps, mapDispatchToProps)(ReportDatabasePage);

export default ReportDatabasePageContainer;
