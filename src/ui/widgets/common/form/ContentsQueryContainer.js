import { connect } from 'react-redux';
import { clearErrors, addToast, TOAST_SUCCESS } from '@entando/messages';
import { injectIntl } from 'react-intl';
import { change, formValueSelector } from 'redux-form';
import { routeConverter } from '@entando/utils';
import { ROUTE_PAGE_CONFIG } from 'app-init/router';

import { sendPutWidgetConfig } from 'state/page-config/actions';
import { fetchSearchPages } from 'state/pages/actions';
import { fetchLanguages } from 'state/languages/actions';
import { fetchCategoryTree } from 'state/categories/actions';
import { fetchContentTypeListPaged } from 'state/content-type/actions';
import { fetchContentModelsByContentType } from 'state/content-model/actions';

import { getContentTypeList } from 'state/content-type/selectors';
import { getCategoryTree } from 'state/categories/selectors';
import ContentsQueryForm from 'ui/widgets/common/form/ContentsQueryForm';
import { getContentModelList } from 'state/content-model/selectors';
import { getLocale } from 'state/locale/selectors';
import { getSearchPages } from 'state/pages/selectors';
import { getActiveLanguages } from 'state/languages/selectors';

const nopage = { page: 1, pageSize: 0 };

export const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.widgetConfig,
  language: getLocale(state),
  languages: getActiveLanguages(state),
  contentTypes: getContentTypeList(state),
  pages: getSearchPages(state),
  categories: getCategoryTree(state),
  contentModels: getContentModelList(state),
  selectedContentType: formValueSelector('widgets.contentsQuery')(state, 'contentType'),
  selectedCategories: formValueSelector('widgets.contentsQuery')(state, 'categories'),
  selectedInclusiveOr: formValueSelector('widgets.contentsQuery')(state, 'orClauseCategoryFilter'),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onDidMount: () => {
    dispatch(fetchLanguages(nopage));
    dispatch(fetchContentTypeListPaged(nopage));
    dispatch(fetchCategoryTree());
    dispatch(fetchSearchPages(nopage));
  },
  onSubmit: (values) => {
    const {
      pageCode, frameId, widgetCode, history, intl,
    } = ownProps;
    const configItem = Object.assign({ config: values }, { code: widgetCode });
    dispatch(clearErrors());
    dispatch(sendPutWidgetConfig(pageCode, frameId, configItem)).then(() => {
      dispatch(addToast(
        intl.formatMessage({ id: 'app.updateSettings.success' }),
        TOAST_SUCCESS,
      ));
      history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode }));
    });
  },
  onResetFilterOption: (name, i) => dispatch(change('widgets.contentsQuery', `${name}.[${i}].option`, '')),
  onChangeContentType: contentType => dispatch(fetchContentModelsByContentType(contentType)),
  onToggleInclusiveOr: value =>
    dispatch(change('widgets.contentsQuery', 'orClauseCategoryFilter', value === 'true' ? '' : 'true')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryForm));
