import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import CloneAssetModal from 'ui/assets/modals/clone-asset/CloneAssetModal';
import { sendCloneAsset } from 'state/assets/actions';

const cloneAssetMsgs = defineMessages({
  cloned: {
    id: 'cms.assets.form.duplicated',
    defaultMessage: '{name} duplicated.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmClone: (asset) => {
    dispatch(sendCloneAsset(asset.id))
      .then((res) => {
        if (res) {
          dispatch(addToast(
            intl.formatMessage(cloneAssetMsgs.cloned, { name: res.name }),
            TOAST_SUCCESS,
          ));
        }
      });
    dispatch(setVisibleModal(''));
  },
});

const CloneAssetModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CloneAssetModal);

export default injectIntl(CloneAssetModalContainer);
