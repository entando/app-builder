import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import MovePageModal from 'ui/pages/common/MovePageModal';
import { setPageParent, movePageAbove, movePageBelow } from 'state/pages/actions';

const pageMoveOptions = {
  INTO_PARENT: 'INTO_PARENT',
  ABOVE_SIBLING: 'ABOVE_SIBLING',
  BELOW_SIBLING: 'BELOW_SIBLING',
};

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmMove: (sourcePageCode, targetPageCode, action) => {
    switch (action) {
      case pageMoveOptions.INTO_PARENT:
        dispatch(setPageParent(sourcePageCode, targetPageCode));
        break;
      case pageMoveOptions.ABOVE_SIBLING:
        dispatch(movePageAbove(sourcePageCode, targetPageCode));
        break;
      case pageMoveOptions.BELOW_SIBLING:
        dispatch(movePageBelow(sourcePageCode, targetPageCode));
        break;
      default: break;
    }
    dispatch(setVisibleModal(''));
  },
});

const MovePageModalContainer = {
  ...connect(mapStateToProps, mapDispatchToProps)(MovePageModal),
  ...pageMoveOptions,
};

export default MovePageModalContainer;
