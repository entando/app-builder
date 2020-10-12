import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE, SEO_ENABLED } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getGroupsList } from 'state/groups/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes, getSelectedPageLocaleTitle } from 'state/pages/selectors';
import { sendPostPage, loadSelectedPage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { PAGE_INIT_VALUES, SEO_DATA_BLANK, SEO_LANGDATA_BLANK } from 'ui/pages/common/const';
import { getLocale } from 'state/locale/selectors';
import getSearchParam from 'helpers/getSearchParam';
import { setVisibleModal } from 'state/modal/actions';
import { getAppTourProgress, getTourCreatedPage } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep, setTourCreatedPage } from 'state/app-tour/actions';

export const mapStateToProps = (state) => {
  const languages = getActiveLanguages(state);
  const seoDataByLang = languages.reduce((acc, curr) => ({
    ...acc,
    [curr.code]: { ...SEO_LANGDATA_BLANK },
  }), {});
  const appTourProgress = getAppTourProgress(state);
  const appTourLastPageData = getTourCreatedPage(state);
  const mainTitleLangCode = (languages[0] || {}).code || 'en';
  const mainTitleName = `titles.${mainTitleLangCode}`;
  return {
    languages,
    groups: getGroupsList(state),
    pageTemplates: getPageTemplatesList(state),
    charsets: getCharsets(state),
    contentTypes: getContentTypes(state),
    selectedJoinGroups: formValueSelector('page')(state, 'joinGroups') || [],
    seoMode: SEO_ENABLED,
    initialValues: {
      ...PAGE_INIT_VALUES,
      seoData: {
        ...SEO_DATA_BLANK,
        seoDataByLang,
      },
      ...(appTourProgress === APP_TOUR_STARTED && {
        titles: {
          [mainTitleLangCode]: 'Hello World App',
        },
        code: 'hello_world_app',
        ownerGroup: 'free',
        parentCode: 'homepage',
        ...appTourLastPageData,
      }),
    },
    mode: 'add',
    locale: getLocale(state),
    parentCode: getSearchParam('parentCode'),
    parentTitle: getSelectedPageLocaleTitle(state),
    appTourProgress,
    mainTitleValue: formValueSelector('page')(state, mainTitleName),
    codeValue: formValueSelector('page')(state, 'code'),
    ownerGroupValue: formValueSelector('page')(state, 'ownerGroup'),
    parentCodeValue: formValueSelector('page')(state, 'parentCode'),
    pageModelValue: formValueSelector('page')(state, 'pageModel'),
  };
};


export const mapDispatchToProps = dispatch => ({
  onWillMount: (data) => {
    dispatch(loadSelectedPage(data.parentCode));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onSubmit: (data, action) =>
    dispatch(sendPostPage(data)).then((res) => {
      if (res) {
        switch (action) {
          case ACTION_SAVE: {
            history.push(ROUTE_PAGE_TREE);
            break;
          }
          case ACTION_SAVE_AND_CONFIGURE: {
            if (data.appTourProgress === APP_TOUR_STARTED) {
              dispatch(setAppTourLastStep(12));
              dispatch(setTourCreatedPage(data));
            }
            history.push(routeConverter(ROUTE_PAGE_CONFIG, { pageCode: data.code }));
            break;
          }
          default: history.push(ROUTE_PAGE_TREE);
        }
      }
    }),
  onChangeDefaultTitle: title =>
    dispatch(change('page', 'code', title.replace(/\W/g, '_').toLowerCase())),
  onFindTemplateClick: () => dispatch(setVisibleModal('FindTemplateModal')),
  onChangePageTemplate: (newValue, appTourProgress) => {
    if (appTourProgress === APP_TOUR_STARTED && newValue) {
      dispatch(setAppTourLastStep(11));
    }
  },
  onChangeOwnerGroup: (newValue, appTourProgress) => {
    console.log(newValue, appTourProgress);
    if (appTourProgress === APP_TOUR_STARTED && newValue) {
      dispatch(setAppTourLastStep(10));
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm);
