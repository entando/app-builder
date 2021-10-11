import { connect } from 'react-redux';
import AssetsUpload from 'ui/assets/AssetsUpload';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { UPLOAD_ASSET_MODAL_ID } from 'ui/assets/modals/upload-assets/constants';

export const mapDispatchToProps = (dispatch, { onAssetSelected, name = '' }) => ({
  onUpload: (assets) => {
    const assetInfo = {
      files: assets.map((asset, fileId) => ({
        fileId,
        filename: asset.name,
        fileObject: asset,
        filePreview: URL.createObjectURL(asset),
        group: '',
        categories: [],
      })),
    };
    dispatch(setInfo(assetInfo));
    dispatch(setVisibleModal(`${UPLOAD_ASSET_MODAL_ID}${name}`));
  },
  onAssetSelected: (asset) => {
    if (onAssetSelected) {
      onAssetSelected(asset);
      dispatch(setVisibleModal(''));
    }
  },
});

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsUpload);
