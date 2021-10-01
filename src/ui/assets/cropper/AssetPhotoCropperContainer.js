import { connect } from 'react-redux';
import { getCropRatios } from 'state/content-settings/selectors';
import { fetchContentSettings } from 'state/content-settings/actions';

import AssetPhotoCropper from 'ui/assets/cropper/AssetPhotoCropper';

const mapStateToProps = state => ({
  cropRatios: getCropRatios(state),
});

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchContentSettings());
  },
});

const AssetPhotoCropperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetPhotoCropper);

export default AssetPhotoCropperContainer;
