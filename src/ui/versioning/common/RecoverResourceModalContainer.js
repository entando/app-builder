import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendRecoverResource } from 'state/versioning/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import RecoverResourceModal from 'ui/versioning/common/RecoverResourceModal';

const recoverResourceMsgs = defineMessages({
  removed: {
    id: 'cms.versioning.modal.resourceRecovered',
    defaultMessage: '{name} recovered.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmRecover: (resource) => {
    const { name, id } = resource;
    dispatch(sendRecoverResource(id)).then(() => {
      dispatch(addToast(
        intl.formatMessage(recoverResourceMsgs.removed, { name }),
        TOAST_SUCCESS,
      ));
    });
    dispatch(setVisibleModal(''));
  },
});

const RecoverResourceModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecoverResourceModal);

export default injectIntl(RecoverResourceModalContainer);
