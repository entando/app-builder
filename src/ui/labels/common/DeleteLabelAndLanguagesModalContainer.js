import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { removeLabel } from 'state/labels/actions';
import { deactivateLanguage } from 'state/languages/actions';
import DeleteLabelAndLanguagesModal from 'ui/labels/common/DeleteLabelAndLanguagesModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (info) => {
    switch (info.type) {
      case 'language': {
        dispatch(deactivateLanguage(info.langCode));
        break;
      }
      case 'label': {
        dispatch(removeLabel(info.code));
        break;
      }
      default: dispatch();
    }

    dispatch(setVisibleModal(''));
  },
});

const DeleteLabelAndLanguagesModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteLabelAndLanguagesModal);

export default DeleteLabelAndLanguagesModalContainer;
