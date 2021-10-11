import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteContent } from 'state/contents/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteContentModal from 'ui/contents/DeleteContentModal';

const contentTemplateMsgs = defineMessages({
  removed: {
    id: 'cms.contenttemplate.list.infoDeleted',
    defaultMessage: '{name} deleted.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmDelete: (content) => {
    dispatch(sendDeleteContent(content.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(contentTemplateMsgs.removed, { modelname: content.description }),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentModal);

export default injectIntl(DeleteContentModalContainer);
