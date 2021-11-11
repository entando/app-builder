import { connect } from 'react-redux';
import { compact, get } from 'lodash';
import { condenseAssetInfo } from 'state/assets/selectors';
import { getMetadataMapping } from 'state/content-settings/selectors';
import { getDomain } from '@entando/apimanager';
import AssetAttributeFieldInfo from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfo';

export const mapStateToProps = (state, { input, langCode }) => {
  const domain = getDomain(state);
  const mapping = getMetadataMapping(state);
  const assetInfo = condenseAssetInfo(input.value[langCode], domain);
  const { type } = assetInfo;

  const fields = {
    name: {
      name: 'name',
      label: 'Text',
      value: assetInfo.name || assetInfo.description,
    },
  };

  const mapnames = mapping ? Object.keys(mapping) : [];
  if (type === 'image' && mapnames.length > 0) {
    fields.metadata = mapnames.map((mapname) => {
      const returnValues = {
        name: mapname,
        label: mapname,
      };
      if (get(assetInfo, `metadata.${mapname}`, false)) {
        return {
          ...returnValues,
          value: assetInfo.metadata[mapname],
        };
      }

      const metadefaults = mapping[mapname] || [];
      const metavals = compact(metadefaults.map(meta => (
        get(assetInfo, `metadata.${meta}`, '')
      ))).join(', ');

      return {
        ...returnValues,
        value: metavals,
      };
    });
  }

  return {
    assetInfo,
    fields,
    mapping,
  };
};

export const mapDispatchToProps = (dispatch, { input, langCode }) => ({
  onUpdateValue: (name, value) => {
    const inputValueLang = input.value[langCode];
    let inputValue;
    if (name === 'name') {
      inputValue = {
        ...inputValueLang,
        name: value,
      };
    } else {
      inputValue = {
        ...inputValueLang,
        metadata: {
          ...inputValueLang.metadata,
          [name]: value,
        },
      };
    }
    input.onChange({
      ...input.value,
      [langCode]: inputValue,
    });
  },
  onRemoveValue: () => input.onChange({}),
});

const AssetAttributeFieldInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetAttributeFieldInfo);

export default AssetAttributeFieldInfoContainer;
