import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { defineMessages, injectIntl } from 'react-intl';

import { sendUpdateContents } from 'state/contents/actions';
import { getLocale } from 'state/locale/selectors';
import { getUsername } from '@entando/apimanager';
import { getJoiningCategories } from 'state/contents/selectors';
import JoinCategoriesModal from 'ui/contents/JoinCategoriesModal';

const contensMsgs = defineMessages({
  removed: {
    id: 'cms.contents.categoriesUpdated',
    defaultMessage: 'Categories Updated',
  },
});

export const mapStateToProps = state => ({
  info: getInfo(state),
  language: getLocale(state),
  joiningCategories: getJoiningCategories(state),
  currentUser: getUsername(state),
});

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onConfirmJoinCategories: (contents) => {
    dispatch(sendUpdateContents(contents)).then((res) => {
      if (res) {
        dispatch(addToast(
          intl.formatMessage(contensMsgs.removed),
          TOAST_SUCCESS,
        ));
      }
    });
    dispatch(setVisibleModal(''));
  },
});

const JoinCategoriesModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinCategoriesModal);

export default injectIntl(JoinCategoriesModalContainer);
