import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchReferences } from 'state/groups/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getPageReferences } from 'state/groups/selectors';
import { getLoading } from 'state/loading/selectors';
import GroupDetailTabPages from 'ui/groups/detail/GroupDetailTabPages';
import { PAGE_REFERENCE_KEY } from 'ui/common/references/const';

export const mapStateToProps = state => ({
  pageReferences: getPageReferences(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: (page) => {
    dispatch(fetchReferences(PAGE_REFERENCE_KEY, params.groupname, page));
  },
});

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps, null,
  {
    pure: false,
  },
)(GroupDetailTabPages));
