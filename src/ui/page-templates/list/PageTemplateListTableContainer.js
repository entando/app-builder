import { connect } from 'react-redux';

import { fetchPageTemplates } from 'state/page-templates/actions';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import PageTemplateListTable from 'ui/page-templates/list/PageTemplateListTable';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/page-templates/common/PageTemplateDeleteModal';

export const mapStateToProps = state => (
  {
    pageTemplates: getPageTemplatesList(state),
    page: getCurrentPage(state),
    totalItems: getTotalItems(state),
    pageSize: getPageSize(state),
    loading: getLoading(state).pageTemplates,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchPageTemplates(page));
  },
  removePageTemplate: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'page template', code }));
  },
});

const PageTemplateListTableContainer =
connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(PageTemplateListTable);

export default PageTemplateListTableContainer;
