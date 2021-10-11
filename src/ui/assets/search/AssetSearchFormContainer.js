import { connect } from 'react-redux';
import { setSearchKeyword, filterAssetsBySearch } from 'state/assets/actions';
import { getAssetSearchKeyword } from 'state/assets/selectors';

import AssetSearchForm from 'ui/assets/search/AssetSearchForm';

export const mapStateToProps = state => ({
  searchTerm: getAssetSearchKeyword(state),
});

export const mapDispatchToProps = dispatch => ({
  onDidMount: () => dispatch(setSearchKeyword('')),
  onSubmit: ({ keyword }) => {
    dispatch(filterAssetsBySearch(keyword || ''));
  },
});

const AssetSearchFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AssetSearchForm);

export default AssetSearchFormContainer;
