import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS, TOAST_ERROR } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import { getCropRatios } from 'state/content-settings/selectors';
import { addCropRatio, removeCropRatio, updateCropRatio } from 'state/content-settings/actions';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

const cropRatioSuccessMsgs = defineMessages({
  added: {
    id: 'cms.contentsettings.ratio.added.success',
    defaultMessage: 'Crop ratio added successfully',
  },
  deleted: {
    id: 'cms.contentsettings.ratio.deleted.success',
    defaultMessage: 'Crop ratio deleted successfully',
  },
  updated: {
    id: 'cms.contentsettings.ratio.updated.success',
    defaultMessage: 'Crop ratio updated successfully',
  },
});

const mapStateToProps = state => ({
  cropRatios: getCropRatios(state),
});

const mapDispatchToProps = (dispatch, { intl }) => ({
  onAdd: (cropRatio) => {
    dispatch(addCropRatio(cropRatio)).then((res) => {
      if (res) {
        dispatch(addToast(intl.formatMessage(cropRatioSuccessMsgs.added), TOAST_SUCCESS));
      }
    });
  },
  onDelete: (cropRatio) => {
    dispatch(removeCropRatio(cropRatio)).then((res) => {
      if (res) {
        dispatch(addToast(intl.formatMessage(cropRatioSuccessMsgs.deleted), TOAST_SUCCESS));
      }
    });
  },
  onUpdate: (cropRatio, newValue) => {
    dispatch(updateCropRatio(cropRatio, newValue)).then((res) => {
      if (res) {
        dispatch(addToast(intl.formatMessage(cropRatioSuccessMsgs.updated), TOAST_SUCCESS));
      }
    });
  },
  onError: (msg) => {
    const errorMsg = defineMessages({
      crop: {
        id: `cms.contentsettings.${msg}`,
        defaultMessage: 'Crop Error',
      },
    });
    dispatch(addToast(intl.formatMessage(errorMsg.crop), TOAST_ERROR));
  },
});

const ContentSettingsCropRatiosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentSettingsCropRatios);

export default injectIntl(ContentSettingsCropRatiosContainer);
