import { connect } from 'react-redux';

import { fetchPageTemplates } from 'state/page-templates/actions';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
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
    columnOrder: getColumnOrder(state, 'pageTemplates'),
    loading: getLoading(state).pageTemplates,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: (page = { page: 1, pageSize: 10 }) => {
    dispatch(fetchPageTemplates(page));
  },

  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'pageTemplates')),

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
