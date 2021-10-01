import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import AssetsListContainer from 'ui/assets/AssetsListContainer';
import AssetsAdvancedSearchContainer from 'ui/assets/AssetsAdvancedSearchContainer';

export const ATTACH_MODAL_ID = 'AssetBrowserModal_attach';
export const IMAGE_MODAL_ID = 'AssetBrowserModal_image';

const AssetBrowserModal = ({
  assetType,
  onAssetSelected,
  onModalOpened,
  ownerGroup,
  joinGroups,
  name,
}) => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.assets.label.assetbrowser" defaultMessage="Browse Asset" />
    </Modal.Title>
  );
  const MODAL_ID = assetType === 'image' ? `${IMAGE_MODAL_ID}${name}` : `${ATTACH_MODAL_ID}${name}`;
  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={<span />}
      modalClassName="AssetsList"
      onOpenModal={onModalOpened}
    >
      <AssetsAdvancedSearchContainer ownerGroup={ownerGroup} />
      <AssetsListContainer
        assetType={assetType}
        browseMode
        onUseAsset={onAssetSelected}
        ownerGroup={ownerGroup}
        joinGroups={joinGroups}
      />
    </GenericModalContainer>
  );
};

AssetBrowserModal.propTypes = {
  assetType: PropTypes.string.isRequired,
  onAssetSelected: PropTypes.func.isRequired,
  onModalOpened: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  ownerGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AssetBrowserModal;
