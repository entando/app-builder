import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { get } from 'lodash';
import { initialize } from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { getSelectedGroup } from 'state/groups/selectors';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLocale } from 'state/locale/selectors';
import { sendPostAssetEdit } from 'state/assets/actions';

import EditAssetFormModal from 'ui/assets/EditAssetFormModal';

const editAssetMsgs = defineMessages({
  saved: {
    id: 'cms.assets.form.updated',
    defaultMessage: '{name} saved.',
  },
});

const mapStateToProps = (state) => {
  const assetInfo = getInfo(state);
  const imgSrc = get(assetInfo, 'versions[0].path', '');
  return {
    assetInfo,
    imgSrc,
    isImg: get(assetInfo, 'type', '') === 'image',
    group: getSelectedGroup(state),
    language: getLocale(state),
    categories: getCategoryTree(state),
  };
};

const mapDispatchToProps = (dispatch, { intl }) => ({
  onModalOpen: (info) => {
    dispatch(fetchCategoryTreeAll());
    dispatch(initialize('editassetformmodal', Object.assign({}, info, { categories: info.categories.map(c => c.code) })));
  },
  onModalClose: () => {
    dispatch(setVisibleModal(''));
  },
  onSubmit: ({
    file,
    id,
    description,
    categories,
    type,
    metadata,
  }) => {
    let editValues = {
      id,
      description,
      categories,
    };
    if (type === 'image') {
      editValues = { ...editValues, filename: metadata.filename };
    }
    dispatch(sendPostAssetEdit(editValues, file)).then((res) => {
      if (res) {
        dispatch(setVisibleModal(''));
        dispatch(addToast(
          intl.formatMessage(editAssetMsgs.saved, { name: res.description }),
          TOAST_SUCCESS,
        ));
      }
    });
  },
});

const EditAssetFormModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(EditAssetFormModal);

export default injectIntl(EditAssetFormModalContainer);
