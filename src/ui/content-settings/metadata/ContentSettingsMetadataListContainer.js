import { connect } from 'react-redux';
import {
  getMetadataMappingList,
  getMetadataMappingFormData,
} from 'state/content-settings/selectors';
import { checkAndPutMetadataMap } from 'state/content-settings/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { MODAL_ID } from 'ui/content-settings/metadata/DeleteContentMetadataModal';

import ContentSettingsMetadataList from 'ui/content-settings/metadata/ContentSettingsMetadataList';

export const mapStateToProps = (state) => {
  const metadata = getMetadataMappingList(state);
  const loadings = metadata.reduce((acc, { key }) => {
    acc[key] = getLoading(state)[key];
    return acc;
  }, {});
  return {
    metadata,
    loadings,
    initialValues: {
      ...getMetadataMappingFormData(state),
    },
  };
};

export const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(checkAndPutMetadataMap(values));
  },
  onPromptDelete: (item) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo(item));
  },
});

const ContentSettingsMetadataListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(ContentSettingsMetadataList);

export default ContentSettingsMetadataListContainer;
