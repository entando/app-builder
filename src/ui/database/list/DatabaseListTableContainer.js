import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import DatabaseListTable from 'ui/database/list/DatabaseListTable';
import { fetchDatabaseDumpReport } from 'state/database/actions';
import { getDatabaseDumpList } from 'state/database/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/database/common/DeleteDatabaseModal';

export const mapStateToProps = state => ({
  databases: getDatabaseDumpList(state),
  loading: getLoading(state).database,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchDatabaseDumpReport(page));
  },
  onClickDelete: (database) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'database', code: database.code }));
  },
});

const DatabaseListTableContainer = connect(mapStateToProps, mapDispatchToProps)(DatabaseListTable);

export default DatabaseListTableContainer;
