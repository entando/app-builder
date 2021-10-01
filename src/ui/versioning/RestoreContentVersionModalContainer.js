import { connect } from 'react-redux';
import { routeConverter } from '@entando/utils';
import { withRouter } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { addToast, TOAST_SUCCESS } from '@entando/messages';

import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { recoverContentVersion } from 'state/versioning/actions';
import { ROUTE_CMS_EDIT_CONTENT } from 'app-init/router';

import RestoreContentVersionModal from 'ui/versioning/RestoreContentVersionModal';

const restoreMsgs = defineMessages({
  restored: {
    id: 'cms.versioning.restore.versionRestored',
    defaultMessage: '{version} restored.',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = (dispatch, { intl, history, match: { params } }) => ({
  onConfirmRestore: (info) => {
    const { versionId, version, contentId } = info;
    dispatch(recoverContentVersion(contentId, versionId)).then((res) => {
      if (res && res.ok) {
        dispatch(addToast(
          intl.formatMessage(restoreMsgs.restored, { version }),
          TOAST_SUCCESS,
        ));
        if (params.contentId) {
          history.push(routeConverter(ROUTE_CMS_EDIT_CONTENT, { id: contentId }));
        } else if (params.id) {
          /* Simple trick to simulate page re-mount without refreshing actual page */
          history.push('/temp');
          history.goBack();
        }
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const RestoreContentVersionModalContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestoreContentVersionModal));

export default injectIntl(RestoreContentVersionModalContainer);
