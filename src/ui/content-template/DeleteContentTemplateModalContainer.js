import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteContentTemplate } from 'state/content-template/actions';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import DeleteContentTemplateModal from 'ui/content-template/DeleteContentTemplateModal';

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
  onConfirmDelete: (contModel) => {
    dispatch(sendDeleteContentTemplate(contModel.id)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(contentTemplateMsgs.removed, { modelname: contModel.descr }),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const DeleteContentTemplateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteContentTemplateModal);

export default injectIntl(DeleteContentTemplateModalContainer);
