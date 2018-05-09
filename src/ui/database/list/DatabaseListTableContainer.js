import { connect } from 'react-redux';
import DatabaseListTable from 'ui/database/list/DatabaseListTable';
import { fetchDatabaseDumpReport } from 'state/database/actions';
import { getDatabaseDumpList } from 'state/database/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/database/common/DeleteDatabaseModal';

export const mapstateToProps = state => ({
  databases: getDatabaseDumpList(state),
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

const DatabaseListTableContainer = connect(mapstateToProps, mapDispatchToProps)(DatabaseListTable);

export default DatabaseListTableContainer;
