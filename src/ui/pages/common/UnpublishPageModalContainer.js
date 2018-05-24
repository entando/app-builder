import { connect } from 'react-redux';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { setSelectedPage, clearSearchPage, unpublishSelectedPage } from 'state/pages/actions';
import UnpublishPageModal from 'ui/pages/common/UnpublishPageModal';
import { getPagesMap } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  info: getInfo(state),
  page: getPagesMap(state)[getInfo(state).code],
});

export const mapDispatchToProps = dispatch => ({
  onConfirmUnpublish: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    dispatch(unpublishSelectedPage());
    dispatch(setVisibleModal(''));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UnpublishPageModal);
