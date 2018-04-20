import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { removePageModel } from 'state/page-models/actions';
import PageModelDeleteModal from 'ui/page-models/common/PageModelDeleteModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (roleCode) => {
    dispatch(removePageModel(roleCode));
    dispatch(setVisibleModal(''));
  },
});

const PageModelDeleteModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(PageModelDeleteModal);

PageModelDeleteModalContainer.displayName = 'PageModelDeleteModalContainer';

export default PageModelDeleteModalContainer;
