import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { get, isUndefined, isNull } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { getContentTemplateList } from 'state/content-template/selectors';
import { adminConsoleUrl } from 'helpers/urlUtils';
import SingleContentConfigForm, { SingleContentConfigFormBody } from 'ui/widget-forms/publish-single-content-config/SingleContentConfigFormBody';
import { fetchContentTemplateList } from 'state/content-template/actions';
import { sendPutWidgetConfig } from 'state/page-config/actions';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/router';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { NoDefaultWarningModalId } from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';
import { ContentsFilterModalID } from 'ui/widget-forms/contents-filter/ContentsFilterModal';
import { PAGE_STATUS_DRAFT } from 'state/pages/const';
import { fetchPage } from 'state/pages/actions';
import { getContentTypeList, getSelectedContentType } from 'state/content-type/selectors';
import { fetchContentTypeListPaged, fetchContentType } from 'state/content-type/actions';
import { setNewContentsType, setWorkMode } from 'state/edit-content/actions';
import { setCurrentStatusShow } from 'state/contents/actions';
import { WORK_MODE_ADD } from 'state/edit-content/types';
import { getAppTourProgress } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep } from 'state/app-tour/actions';

const INITIAL_VALUES = {
  chosenContent: {},
  contentId: '',
  chosenContentType: '',
  modelId: '',
  contentDescription: '',
  joinGroups: [],
  ownerGroup: '',
};

export const mapStateToProps = (state, ownProps) => {
  let widgetConfig = null;
  if (ownProps.widgetConfig !== null && ownProps.widgetConfig !== undefined) {
    const { contents, ...rest } = ownProps.widgetConfig;
    widgetConfig = rest;
  }
  return {
    contentTemplates: getContentTemplateList(state),
    contentType: getSelectedContentType(state),
    initialValues: widgetConfig || INITIAL_VALUES,
    chosenContent: widgetConfig,
    contentTypes: getContentTypeList(state),
    appTourProgress: getAppTourProgress(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const parentField = get(ownProps, 'input.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: (setFieldValue) => {
      dispatch(fetchContentTypeListPaged({ page: 1, pageSize: 0 }));
      dispatch(fetchContentTemplateList({ page: 1, pageSize: 0 }));
      dispatch(fetchPage(ownProps.pageCode, PAGE_STATUS_DRAFT)).then((res) => {
        const { ownerGroup, joinGroups } = res.payload || {};
        setFieldValue(putPrefixField('ownerGroup'), ownerGroup);
        setFieldValue(putPrefixField('joinGroups'), joinGroups);
      });
    },
    parentField,
    putPrefixField,
    onSubmit: (values, setSubmitting) => {
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
        setSubmitting(false);
        if (res) {
          dispatch(addToast(
            intl.formatMessage({ id: 'widget.update.success' }),
            TOAST_SUCCESS,
          ));
          dispatch(setAppTourLastStep(22));
          history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
        }
      }).catch(() => setSubmitting(false));
    },
    onSave: (submitForm) => {
      dispatch(setAppTourLastStep(22));
      dispatch(setVisibleModal(''));
      submitForm();
    },
    loadContentTypeDetails: (contentTypeCode, setFieldValue) =>
      dispatch(fetchContentType(contentTypeCode))
        .then((ctype) => {
          setFieldValue(putPrefixField('chosenContentType'), ctype);
        }),
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
    onSelectContent: (selectContent, andCloseModal = true, setFieldValue) => {
      setFieldValue(putPrefixField('contentId'), selectContent.id);
      setFieldValue(putPrefixField('contentDescription'), selectContent.description);
      if (andCloseModal) {
        dispatch(setVisibleModal(''));
        dispatch(setAppTourLastStep(21));
      }
    },
    onClickAddContent: (contentType) => {
      dispatch(setWorkMode(WORK_MODE_ADD));
      dispatch(setCurrentStatusShow('all'));
      dispatch(setNewContentsType(contentType));
      const newRoute = adminConsoleUrl(`do/jacms/Content/createNew.action?contentTypeCode=${contentType.typeCode}`);
      window.location.href = newRoute;
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(SingleContentConfigForm));
