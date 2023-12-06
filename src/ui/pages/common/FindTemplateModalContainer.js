import { connect } from 'react-redux';
import FindTemplateModal from 'ui/pages/common/FindTemplateModal';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { setVisibleModal } from 'state/modal/actions';

export const mapStateToProps = state => ({
  pageTemplates: getPageTemplatesList(state),
  page: getCurrentPage(state),
  totalItems: getTotalItems(state),
  pageSize: getPageSize(state),
  loading: getLoading(state).pageTemplates,
});

export const mapDispatchToProps = (dispatch, { setFieldValue }) => ({
  onSelectClick: (value) => {
    setFieldValue('pageModel', value);
    dispatch(setVisibleModal(''));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FindTemplateModal);
