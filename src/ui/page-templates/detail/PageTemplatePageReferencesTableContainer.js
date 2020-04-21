import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCurrentReferencePages } from 'state/page-templates/actions';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocalizedPageTemplatePageRefs } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';

import PageTemplatePageReferencesTable from 'ui/page-templates/detail/PageTemplatePageReferencesTable';

export const mapStateToProps = state => ({
  pageReferences: getLocalizedPageTemplatePageRefs(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).references,
});

export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onWillMount: () => {
    dispatch(fetchCurrentReferencePages(params.pageTemplateCode));
  },
});

const PageTemplatePageReferencesTableContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  null, { pure: false },
)(PageTemplatePageReferencesTable));

PageTemplatePageReferencesTableContainer.displayName = 'PageTemplatePageReferencesTableContainer';

export default PageTemplatePageReferencesTableContainer;
