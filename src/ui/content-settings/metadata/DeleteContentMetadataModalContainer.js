import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteMetadataMap } from 'state/content-settings/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteContentMetadataModal from 'ui/content-settings/metadata/DeleteContentMetadataModal';

const contentTemplateMsgs = defineMessages({
  removed: {
    id: 'cms.contentsettings.metadata.infoDeleted',
    defaultMessage: '{name} deleted.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmDelete: (contMeta) => {
    dispatch(sendDeleteMetadataMap(contMeta.key)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(contentTemplateMsgs.removed, { name: contMeta.key }),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentMetadataModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentMetadataModal);

export default injectIntl(DeleteContentMetadataModalContainer);
