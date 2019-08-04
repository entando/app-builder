import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCurrentReferencePages } from 'state/page-models/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocalizedPageModelPageRefs } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';

import PageModelPageReferencesTable from 'ui/page-models/detail/PageModelPageReferencesTable';

export const mapStateToProps = state => ({
  pageReferences: getLocalizedPageModelPageRefs(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferencePages(params.pageModelCode));
  },
});

const PageModelPageReferencesTableContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageModelPageReferencesTable));

PageModelPageReferencesTableContainer.displayName = 'PageModelPageReferencesTableContainer';

export default PageModelPageReferencesTableContainer;
