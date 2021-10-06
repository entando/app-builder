import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteAsset, fetchAssetsCount } from 'state/assets/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteAssetModal from 'ui/assets/DeleteAssetModal';

const contentTemplateMsgs = defineMessages({
  removed: {
    id: 'cms.contenttemplate.list.infoDeleted',
    defaultMessage: '{name} deleted.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmDelete: (asset) => {
    dispatch(sendDeleteAsset(asset.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(contentTemplateMsgs.removed, { modelname: asset.description }),
          TOAST_SUCCESS,
        ));
        dispatch(fetchAssetsCount(asset.type));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteAssetModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteAssetModal);

export default injectIntl(DeleteAssetModalContainer);
