import { connect } from 'react-redux';
import ImageAttributeField from 'ui/edit-content/content-attributes/ImageAttributeField';
import { setVisibleModal } from 'state/modal/actions';
import { getActiveLanguages, getLanguages, getDefaultLanguage } from 'state/languages/selectors';
import {
  fetchAssetsPaged,
  changeFileType,
} from 'state/assets/actions';
import { fetchMyGroups } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';

import { IMAGE_MODAL_ID } from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';


export const mapStateToProps = (state) => {
  const languages = (getLanguages(state) && getActiveLanguages(state)) || [];
  const langCodes = languages.map(({ code }) => code);
  const defaultLang = getDefaultLanguage(state);
  return { languages, langCodes, defaultLang };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  assetListBegin: () => {
    const { mainGroup, joinGroups } = ownProps;
    dispatch(fetchMyGroups());
    dispatch(changeFileType('image'));
    dispatch(fetchAssetsPaged(undefined, undefined, mainGroup, joinGroups));
    dispatch(fetchCategoryTree());
  },
  onClickAdd: name => dispatch(setVisibleModal(`${IMAGE_MODAL_ID}${name}`)),
});

const ImageAttributeFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageAttributeField);

export default ImageAttributeFieldContainer;
