import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { get, isUndefined, isNull } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import SingleContentConfigForm, { SingleContentConfigFormBody, SingleContentConfigContainerId } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigFormBody';
import { fetchContentTemplateListPaged } from 'state/content-template/actions';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG, ROUTE_CMS_ADD_CONTENT } from 'app-init/router';
import { formValueSelector, submit, change } from 'redux-form';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { NoDefaultWarningModalId } from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { ContentsFilterModalID } from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';
import { fetchPage } from 'state/pages/actions';
import { getContentTypeList, getSelectedContentType } from 'state/content-type/selectors';
import { fetchContentType } from 'state/content-type/actions';
import { setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { setCurrentStatusShow } from 'state/contents/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

export const mapStateToProps = (state, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  const formSelect = formValueSelector(formToUse);
  let widgetConfig = null;
  if (ownProps.widgetConfig !== null && ownProps.widgetConfig !== undefined) {
    const { contents, ...rest } = ownProps.widgetConfig;
    widgetConfig = rest;
  }
  return {
    contentTemplates: getContentTemplateList(state),
    contentType: getSelectedContentType(state),
    initialValues: widgetConfig || {},
    chosenContent: widgetConfig,
    ownerGroup: formSelect(state, putPrefixField('ownerGroup')),
    joinGroups: formSelect(state, putPrefixField('joinGroups')),
    contentTypes: getContentTypeList(state),
    appTourProgress: getAppTourProgress(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const formToUse = get(ownProps, 'extFormName', SingleContentConfigContainerId);
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchContentTemplateListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchPage(ownProps.pageCode, PAGE_STATUS_DRAFT)).then((res) => {
        const { ownerGroup, joinGroups } = res.payload || {};
        dispatch(change(formToUse, putPrefixField('ownerGroup'), ownerGroup));
        dispatch(change(formToUse, putPrefixField('joinGroups'), joinGroups));
      });
    },
    putPrefixField,
    onSubmit: (values) => {
      dispatch(clearErrors());
      const {
        pageCode, frameId, intl, history, widgetCode,
      } = ownProps;
      const { chosenContentType, ...otherValues } = values;
      const configItem = {
        config: {
          ...otherValues,
          ...(values.modelId != null && { modelId: values.modelId }),
        },
        code: widgetCode,
      };

      if ((isUndefined(values.modelId) || values.modelId === 'default') && isNull(chosenContentType.defaultContentModel)) {
        return dispatch(setVisibleModal(NoDefaultWarningModalId));
      }
      return dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then((res) => {
        if (res) {
          dispatch(addToast(
            intl.formatMessage({ id: 'widget.update.success' }),
            TOAST_SUCCESS,
          ));
          dispatch(setAppTourLastStep(22));
          history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
        }
      });
    },
    onSave: () => {
      dispatch(setAppTourLastStep(22));
      dispatch(setVisibleModal(''));
      dispatch(submit(SingleContentConfigContainerId));
    },
    loadContentTypeDetails: contentTypeCode => dispatch(fetchContentType(contentTypeCode, false))
      .then(ctype => (
        dispatch(change(formToUse, putPrefixField('chosenContentType'), ctype))
      )),
    onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
    onDiscard: () => {
      dispatch(setVisibleModal(''));
      const { history, pageCode } = ownProps;
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    },
    showFilterModal: (appTourProgress) => {
      if (appTourProgress === APP_TOUR_STARTED) {
        dispatch(setAppTourLastStep(19));
      }
      dispatch(setVisibleModal(ContentsFilterModalID));
    },
    onSelectContent: (selectContent, andCloseModal = true) => {
      dispatch(change(formToUse, putPrefixField('contentId'), selectContent.id));
      dispatch(change(formToUse, putPrefixField('contentDescription'), selectContent.description));
      if (andCloseModal) {
        dispatch(setVisibleModal(''));
        dispatch(setAppTourLastStep(21));
      }
    },
    onClickAddContent: (contentType) => {
      const {
        history, pageCode, widgetCode, frameId,
      } = ownProps;
      dispatch(setWorkMode(WORK_MODE_ADD));
      dispatch(setCurrentStatusShow('all'));
      dispatch(setNewContentsType(contentType));
      const newRoute = routeConverter(ROUTE_CMS_ADD_CONTENT, { contentType: contentType.typeCode });
      history.push(`${newRoute}?callbackWidget=${widgetCode}&callbackPage=${pageCode}&callbackFrame=${frameId}`);
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));
