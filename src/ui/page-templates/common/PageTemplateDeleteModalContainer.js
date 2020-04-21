import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { removePageTemplate } from 'state/page-templates/actions';
import PageTemplateDeleteModal from 'ui/page-templates/common/PageTemplateDeleteModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (roleCode) => {
    dispatch(removePageTemplate(roleCode));
    dispatch(setVisibleModal(''));
  },
});

const PageTemplateDeleteModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(PageTemplateDeleteModal);

PageTemplateDeleteModalContainer.displayName = 'PageTemplateDeleteModalContainer';

export default PageTemplateDeleteModalContainer;
