import { connect } from 'react-redux';
import { addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl, defineMessages } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';

import { fetchContentTypeListPaged, fetchContentType, clearSelectedContentType } from 'state/content-type/actions';
import {
  fetchContentTemplateDictionary,
  sendPutContentTemplate,
  fetchContentTemplate,
  clearContentTemplate,
  clearContentTemplateDictionary,
} from 'state/content-template/actions';
import { getContentTypeList } from 'state/content-type/selectors';
import { getContentTemplateDictionaryList } from 'state/content-template/selectors';
import { ROUTE_CMS_CONTENTTEMPLATE_LIST } from 'app-init/router';

import AddContentTemplateForm from 'ui/content-template/AddContentTemplateForm';

const contentTemplateMsgs = defineMessages({
  saved: {
    id: 'cms.contenttemplate.form.saved',
    defaultMessage: '{name} saved.',
  },
});

export const mapStateToProps = (state) => {
  const contentTypes = getContentTypeList(state);
  return {
    contentTypes,
    mode: 'edit',
    dictionary: getContentTemplateDictionaryList(state),
  };
};

export const mapDispatchToProps = (dispatch, { intl, history, match: { params } }) => ({
  onDidMount: () => {
    dispatch(fetchContentTypeListPaged({ pageSize: 0 }))
      .then(() => dispatch(fetchContentTemplate(params.id)))
      .then(({ contentType }) => dispatch(fetchContentType(contentType, false)))
      .then(() => dispatch(fetchContentTemplateDictionary()));
  },
  onDidUnmount: () => {
    dispatch(clearContentTemplate());
    dispatch(clearContentTemplateDictionary());
    dispatch(clearSelectedContentType());
  },
  onChangeContentType: (code) => {
    dispatch(fetchContentType(code));
  },
  onSubmit: values => dispatch(sendPutContentTemplate(values)).then((res) => {
    if (res) {
      dispatch(addToast(
        intl.formatMessage(contentTemplateMsgs.saved, { modelname: values.descr }),
        TOAST_SUCCESS,
      ));
      history.push(ROUTE_CMS_CONTENTTEMPLATE_LIST);
    }
  }),
  onSave: () => { dispatch(setVisibleModal('')); dispatch(submit('contenttemplateform')); },
  onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
  onDiscard: () => { dispatch(setVisibleModal('')); history.push(routeConverter(ROUTE_CMS_CONTENTTEMPLATE_LIST)); },
});

const EditContentTemplateFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(AddContentTemplateForm);

export default withRouter(injectIntl(EditContentTemplateFormContainer));
