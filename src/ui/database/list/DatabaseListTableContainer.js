import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { fetchDatabaseDumpReport } from 'state/database/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';

import { MODAL_ID } from 'ui/database/common/DeleteDatabaseModal';
import DatabaseListTable from 'ui/database/list/DatabaseListTable';
import { getDatabaseDumpList, getDatabaseStatusBackup } from 'state/database/selectors';


export const mapStateToProps = state => ({
  databases: getDatabaseDumpList(state),
  loading: getLoading(state).database,
  status: getDatabaseStatusBackup(state),
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 0 }) => {
    dispatch(fetchDatabaseDumpReport(page));
  },
  onClickDelete: (database) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'database', code: database.code }));
  },
});

const DatabaseListTableContainer = connect(mapStateToProps, mapDispatchToProps)(DatabaseListTable);

export default DatabaseListTableContainer;
