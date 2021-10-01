import { connect } from 'react-redux';


import AssetsCount from 'ui/assets/AssetsCount';
import { fetchAssetsCount } from 'state/assets/actions';
import { getAssetsCount } from 'state/assets/selectors';


export const mapStateToProps = state => ({
  imageCount: getAssetsCount(state).image,
  fileCount: getAssetsCount(state).file,
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchAssetsCount('image'));
    dispatch(fetchAssetsCount('file'));
  },
});

const AssetsCountContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetsCount);

export default AssetsCountContainer;
