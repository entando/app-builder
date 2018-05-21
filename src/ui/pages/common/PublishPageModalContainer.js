import { connect } from 'react-redux';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { setSelectedPage, clearSearchPage, publishSelectedPage } from 'state/pages/actions';
import PublishPageModal from 'ui/pages/common/PublishPageModal';
import { getPagesMap } from 'state/pages/selectors';

export const mapStateToProps = state => ({
  info: getInfo(state),
  page: getPagesMap(state)[getInfo(state).code],
});

export const mapDispatchToProps = dispatch => ({
  onConfirmPublish: (page) => {
    dispatch(setSelectedPage(page));
    dispatch(clearSearchPage());
    dispatch(publishSelectedPage());
    dispatch(setVisibleModal(''));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishPageModal);
