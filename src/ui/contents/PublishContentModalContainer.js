import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendPublishMultipleContents, selectAllRows } from 'state/contents/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import PublishContentModal from 'ui/contents/PublishContentModal';

const publishContentMsgs = defineMessages({
  published: {
    id: 'cms.contents.published',
    defaultMessage: '{name} published.',
  },
  unpublished: {
    id: 'cms.contents.unpublished',
    defaultMessage: '{name} unpublished.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmPublish: (contentIds, status) => {
    dispatch(sendPublishMultipleContents(contentIds, status)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(status === 'published'
            ? publishContentMsgs.published
            : publishContentMsgs.unpublished),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(selectAllRows(false));
    dispatch(setVisibleModal(''));
  },
});

const PublishContentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublishContentModal);

export default injectIntl(PublishContentModalContainer);
