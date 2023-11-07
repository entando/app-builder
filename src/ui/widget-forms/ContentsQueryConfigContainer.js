import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { get, isUndefined, isNull } from 'lodash';
import { injectIntl } from 'react-intl';
import { routeConverter } from '@entando/utils';
import { ROUTE_APP_BUILDER_PAGE_CONFIG } from 'app-init/router';

import { sendPutWidgetConfig } from 'state/page-config/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { fetchCategoryTreeAll } from 'state/categories/actions';
import { fetchContentTypeListPaged, fetchContentType, setSelectedContentType } from 'state/content-type/actions';
import { fetchContentTemplatesByContentType } from 'state/content-template/actions';

import { getContentTypeList, getSelectedContentType } from 'state/content-type/selectors';
import { getCategoryTree } from 'state/categories/selectors';
import ContentsQueryConfig, { ContentsQueryFormBody } from 'ui/widget-forms/ContentsQueryConfig';
import { getContentTemplateList } from 'state/content-template/selectors';
import { getLocale } from 'state/locale/selectors';
import { getSearchPagesRaw } from 'state/pages/selectors';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { ConfirmCancelModalID } from 'ui/common/cancel-modal/ConfirmCancelModal';
import { NoDefaultWarningModalId } from 'ui/widget-forms/publish-single-content-config/NoDefaultWarningModal';

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state, ownProps) => {
  const parentField = get(ownProps, 'field.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);

  const INITIAL_VALUES = {
    [putPrefixField('contentType')]: '',
    [putPrefixField('modelId')]: '',
    [putPrefixField('maxElemForItem')]: '',
    [putPrefixField('maxElements')]: '',
    [putPrefixField('categories')]: [],
    [putPrefixField('filters')]: [],
    [putPrefixField('pageLink')]: '',
    [putPrefixField('userFilters')]: [],
    [putPrefixField('orClauseCategoryFilter')]: '',
  };

  return {
    initialValues: ownProps.widgetConfig || INITIAL_VALUES,
    language: getLocale(state),
    languages: getActiveLanguages(state),
    contentTypes: getContentTypeList(state),
    contentType: getSelectedContentType(state),
    pages: getSearchPagesRaw(state),
    categories: getCategoryTree(state),
    contentTemplates: getContentTemplateList(state),
    defaultLanguageCode: getDefaultLanguage(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  const parentField = get(ownProps, 'field.name', '');
  const putPrefixField = field => (parentField !== '' ? `${parentField}.${field}` : field);
  return {
    onDidMount: () => {
      dispatch(fetchLanguages(nopage));
      dispatch(fetchContentTypeListPaged(nopage));
      dispatch(fetchCategoryTreeAll());
      dispatch(fetchSearchPages(nopage));
    },
    putPrefixField,
    parentField,
    onSubmit: (values) => {
      const {
        pageCode, frameId, widgetCode,
      } = ownProps;
      const { contentTypeDetails, ...checkedValues } = values;
      if (values.modelId === '') delete checkedValues.modelId;
      checkedValues.filters = checkedValues.filters && checkedValues.filters.filter(f => f != null);
      checkedValues.userFilters = checkedValues.userFilters
      && checkedValues.userFilters.filter(f => f != null);
      const configItem = Object.assign({ config: checkedValues }, { code: widgetCode });
      dispatch(clearErrors());

      if ((isUndefined(values.modelId) || values.modelId === '')
       && isNull(contentTypeDetails)
      && isNull(contentTypeDetails.defaultContentModelList)) {
        dispatch(setVisibleModal(NoDefaultWarningModalId));
      }

      return dispatch(sendPutWidgetConfig(pageCode, frameId, configItem));
    },
    onResetFilterOption: (name, i, value, setFieldValue) => {
      setFieldValue(`${name}.${i}.option`, '');
      setFieldValue(`${name}.${i}.key`, value);
    },
    onChangeFilterAttribute: (name, i, value, setFieldValue) => {
      setFieldValue(`${name}.${i}.attributeFilter`, value);
    },
    onChangeFilterValue: (name, i, value, setFieldValue) => {
      setFieldValue(`${name}.${i}`, value);
    },
    setSelectedContentType: (contentType) => {
      dispatch(fetchContentTemplatesByContentType(contentType.code));
      dispatch(setSelectedContentType(contentType));
    },
    onChangeContentType: (contentType, setFieldValue) => {
      if (contentType) {
        dispatch(fetchContentTemplatesByContentType(contentType));
        dispatch(fetchContentType(contentType, false))
          .then(ctype => setFieldValue(putPrefixField('contentTypeDetails'), ctype));
      }
    },
    onResetModelId: setFieldValue => setFieldValue(putPrefixField('modelId'), ''),
    onToggleInclusiveOr: (value, setFieldValue) => setFieldValue(putPrefixField('orClauseCategoryFilter'), value === 'true' ? '' : 'true'),
    onSave: (submitForm) => {
      submitForm();
      dispatch(setVisibleModal(''));
    },
    onCancel: () => dispatch(setVisibleModal(ConfirmCancelModalID)),
    onDiscard: () => {
      dispatch(setVisibleModal(''));
      const { history, pageCode } = ownProps;
      history.push(routeConverter(ROUTE_APP_BUILDER_PAGE_CONFIG, { pageCode }));
    },
    continueWithDispatch: (dispatchValue) => {
      dispatch(dispatchValue);
    },
  };
};

export const formBody = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryFormBody));

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryConfig));
