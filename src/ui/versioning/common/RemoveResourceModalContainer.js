import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendRemoveResource } from 'state/versioning/actions';

import RemoveResourceModal from 'ui/versioning/common/RemoveResourceModal';

const restoreMsgs = defineMessages({
  removed: {
    id: 'cms.versioning.modal.resourceRemoved',
    defaultMessage: '{name} removed.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmRemove: (resource) => {
    const { name, id } = resource;
    dispatch(sendRemoveResource(id)).then(() => {
      dispatch(addToast(
        intl.formatMessage(restoreMsgs.removed, { name }),
        TOAST_SUCCESS,
      ));
    });
    dispatch(setVisibleModal(''));
  },
});

const RemoveResourceModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveResourceModal);

export default injectIntl(RemoveResourceModalContainer);
