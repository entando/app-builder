import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get, isNull } from 'lodash';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import ContentConfigForm, { MultipleContentsConfigContainerId, ContentConfigFormBody } from 'ui/widget-forms/ContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { fetchContentType } from 'state/content-type/actions';
import { NoDefaultWarningModalId } from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { fetchSearchPages, fetchPage } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/router';
import { formValueSelector, submit, change, arrayPush, getFormValues } from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', MultipleContentsConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    contentTemplates: getContentTemplateList(state),
    initialValues: ownProps.widgetConfig || {},
    languages: getActiveLanguages(state),
    pages: getSearchPagesRaw(state),
    language: getLocale(state),
    widgetCode: ownProps.widgetCode,
    chosenContents: formValueSelector(formToUse)(state, putPrefixField('contents')),
    chosenContentTypes: formValueSelector(formToUse)(state, putPrefixField('chosenContentTypes')),
    ownerGroup: formValueSelector(formToUse)(state, putPrefixField('ownerGroup')),
    joinGroups: formValueSelector(formToUse)(state, putPrefixField('joinGroups')),
    widgetConfigFormData: getFormValues(formToUse)(state),
    defaultLanguageCode: getDefaultLanguage(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', MultipleContentsConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
      dispatch(fetchSearchPages({ page: 1, pageSize: 0 }));
      dispatch(fetchPage(ownProps.pageCode, PAGE_STATUS_DRAFT)).then((res) => {
        const { ownerGroup, joinGroups } = res.payload || {};
        dispatch(change(formToUse, putPrefixField('ownerGroup'), ownerGroup));
        dispatch(change(formToUse, putPrefixField('joinGroups'), joinGroups));
      });
    },
    putPrefixField,
    onSubmit: ({ chosenContentTypes, ...values }) => {
      dispatch(clearErrors());
      const {
        pageCode, frameId, intl, history,
      } = ownProps;
      const contents = values.contents || [];
      let hasNoDefaultTemplates = false;
      const configContents = contents.map((cc) => {
        if (!hasNoDefaultTemplates) {
          const contentId = get(cc, 'contentId', get(cc, 'id', ''));
          const typeCodeSub = contentId ? contentId.substr(0, 3) : '';
          const contentTypeCode = get(cc, 'typeCode', typeCodeSub);
          const theContentType = chosenContentTypes.find(contentType => (
            contentType.code === contentTypeCode
          ));
          hasNoDefaultTemplates = ((!cc.modelId || cc.modelId === 'default') && isNull(theContentType.defaultContentModelList));
        }
        return Object.assign(
          {},
          {
            contentId: cc.contentId,
            ...(cc.modelId != null && { modelId: cc.modelId }),
            contentDescription: cc.contentDescription,
          },
        );
      });
      const payload = { ...values, contents: configContents };
      const configItem = Object.assign({ config: payload }, { code: ownProps.widgetCode });
      dispatch(clearErrors());
      if (hasNoDefaultTemplates) {
        return dispatch(setVisibleModal(NoDefaultWarningModalId));
      }
      return dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then((res) => {
        if (res) {
          dispatch(addToast(
            intl.formatMessage({ id: 'widget.update.success' }),
            TOAST_SUCCESS,
          ));
          history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
        }
      });
    },
    pushContentTypeDetails: contentTypeCodes => (
      contentTypeCodes.forEach(contentTypeCode => (
        dispatch(fetchContentType(contentTypeCode, false))
          .then(ctype => (
            dispatch(arrayPush(formToUse, putPrefixField('chosenContentTypes'), ctype))
          ))
      ))
    ),
    onSave: () => { dispatch(setVisibleModal('')); dispatch(submit(MultipleContentsConfigContainerId)); },
    onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
    onDiscard: () => {
      dispatch(setVisibleModal(''));
      const { history, pageCode } = ownProps;
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentConfigForm));
