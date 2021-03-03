import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import MovePageModal from 'ui/pages/common/MovePageModal';
import { setPageParent, movePageAbove, movePageBelow } from 'state/pages/actions';
import { PAGE_MOVEMENT_OPTIONS } from 'state/pages/const';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmMove: (sourcePageCode, targetPageCode, action) => {
    switch (action) {
      case PAGE_MOVEMENT_OPTIONS.INTO_PARENT:
        dispatch(setPageParent(sourcePageCode, targetPageCode));
        break;
      case PAGE_MOVEMENT_OPTIONS.ABOVE_SIBLING:
        dispatch(movePageAbove(sourcePageCode, targetPageCode));
        break;
      case PAGE_MOVEMENT_OPTIONS.BELOW_SIBLING:
        dispatch(movePageBelow(sourcePageCode, targetPageCode));
        break;
      default: break;
    }
    dispatch(setVisibleModal(''));
  },
});

const MovePageModalContainer = connect(mapStateToProps, mapDispatchToProps)(MovePageModal);

export default MovePageModalContainer;
