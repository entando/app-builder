import { connect } from 'react-redux';
import AttachAttributeField from 'ui/edit-content/content-attributes/AttachAttributeField';
import { setVisibleModal } from 'state/modal/actions';
import { getActiveLanguages, getLanguages, getDefaultLanguage } from 'state/languages/selectors';
import {
  fetchAssetsPaged,
  pageDefault,
} from 'state/assets/actions';
import { fetchMyGroups } from 'state/groups/actions';
import { fetchCategoryTree } from 'state/categories/actions';

import { ATTACH_MODAL_ID } from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

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
    dispatch(fetchAssetsPaged(pageDefault, 'file', mainGroup, joinGroups));
    dispatch(fetchCategoryTree());
  },
  onClickAdd: name => dispatch(dispatch(setVisibleModal(`${ATTACH_MODAL_ID}${name}`))),
});

const AttachAttributeFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttachAttributeField);

export default AttachAttributeFieldContainer;
