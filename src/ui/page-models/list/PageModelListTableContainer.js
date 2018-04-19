import { connect } from 'react-redux';

import { fetchPageModels } from 'state/page-models/actions';
import { getPageModelsList } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import PageModelListTable from 'ui/page-models/list/PageModelListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/page-models/common/PageModelDeleteModal';

export const mapStateToProps = state => (
  {
    pageModels: getPageModelsList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).pageModels,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchPageModels(page));
  },
  removePageModel: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'page model', code }));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(PageModelListTable);
