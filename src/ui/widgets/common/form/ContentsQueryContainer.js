import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { injectIntl } from 'react-intl';
import { change, formValueSelector } from 'redux-form';

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
import { putPageWidget } from 'api/pages';

const nopage = { page: 1, pageSize: 0 };

const parseObject = (string) => {
  const replaced = string.replace(/\(*(\w+)(?:=)(\w+)()\)*/gm, '"$1":"$2"');
  return JSON.parse(`{${replaced}}`);
};

const convertToJSON = arr => arr.replace(/;+/gm, ',').split('+').map(item => parseObject(item));

const parseConfig = (widgetConfig) => {
  if (!widgetConfig || !widgetConfig.filters) {
    return widgetConfig;
  }
  let { filters, userFilters, categories } = widgetConfig;
  const reMap = filter => Object.assign(filter, { code: filter.key });
  filters = convertToJSON(filters).map(reMap);
  userFilters = convertToJSON(userFilters).map(reMap);
  categories = categories.split(',');
  return {
    ...widgetConfig,
    filters,
    userFilters,
    categories,
  };
};

export const mapStateToProps = (state, ownProps) => ({
  initialValues: parseConfig(ownProps.widgetConfig),
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
    const { pageCode, frameId, widgetCode } = ownProps;
    const configItem = Object.assign({ config: values }, { code: widgetCode });
    dispatch(clearErrors());
    dispatch(putPageWidget(pageCode, frameId, configItem));
  },
  onResetFilterOption: (name, i) => dispatch(change('widgets.contentsQuery', `${name}.[${i}].option`, '')),
  onChangeContentType: contentType => dispatch(fetchContentModelsByContentType(contentType)),
  onToggleInclusiveOr: value =>
    dispatch(change('widgets.contentsQuery', 'orClauseCategoryFilter', value === 'true' ? '' : 'true')),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(injectIntl(ContentsQueryForm));
