import { connect } from 'react-redux';
import { formValueSelector, change, initialize } from 'redux-form';
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
import { getAppTourProgress, getTourCreatedPage, getExistingPages } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { setAppTourLastStep, setTourCreatedPage } from 'state/app-tour/actions';

export const getNextIncremetalPropertyName = (pages, property, keyword, extraChar) => {
  let max = 0;
  pages.forEach((page) => {
    const target = page[property];
    if (!target) return false;
    const splittedTarget = target.split(keyword);
    const numberString = (splittedTarget[splittedTarget.length - 1]).replace('_', ' ').trim();
    const number = Number(numberString);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(number) && number >= max) {
      max = number + 1;
    } else if (numberString === '') {
      max = 1;
    }
    return max;
  });
  return `${keyword}${max ? `${extraChar}${max}` : ''}`;
};

export const mapStateToProps = (state) => {
  const languages = getActiveLanguages(state);
  const seoDataByLang = languages.reduce((acc, curr) => ({
    ...acc,
    [curr.code]: { ...SEO_LANGDATA_BLANK },
  }), {});
  const appTourProgress = getAppTourProgress(state);
  const mainTitleLangCode = (languages[0] || {}).code || 'en';
  const mainTitleName = `titles.${mainTitleLangCode}`;
  const appTourLastPageData = getTourCreatedPage(state);
  const parentCode = getSearchParam('parentCode');
  const existingPages = (getExistingPages(state) || []).map(page =>
    ({ ...page, name: page.titles[mainTitleLangCode] }));
  const pageName = getNextIncremetalPropertyName(existingPages, 'name', 'Hello World App', ' ');
  const pageCode = getNextIncremetalPropertyName(existingPages, 'code', 'hello_world_app', '_');

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
      ...(parentCode ? { parentCode } : {}),
      ...(appTourProgress === APP_TOUR_STARTED && {
        titles: {
          [mainTitleLangCode]: pageName,
        },
        code: pageCode,
        ownerGroup: 'free',
        parentCode: 'homepage',
        ...appTourLastPageData,
      }),
    },
    mode: 'add',
    locale: getLocale(state),
    parentCode,
    parentTitle: getSelectedPageLocaleTitle(state),
    appTourProgress,
    mainTitleValue: formValueSelector('page')(state, mainTitleName),
    codeValue: formValueSelector('page')(state, 'code'),
    ownerGroupValue: formValueSelector('page')(state, 'ownerGroup'),
    parentCodeValue: formValueSelector('page')(state, 'parentCode'),
    pageModelValue: formValueSelector('page')(state, 'pageModel'),
    appTourLastPageData,
  };
};


export const mapDispatchToProps = dispatch => ({
  onWillMount: (data) => {
    dispatch(loadSelectedPage(data.parentCode));
    dispatch(fetchLanguages({ page: 1, pageSize: 0 }));
  },
  onInitPageForm: (data) => {
    const {
      appTourProgress, codeValue, languages, appTourLastPageData,
    } = data;
    const mainTitleLangCode = (languages[0] || {}).code || 'en';
    if (appTourProgress === APP_TOUR_STARTED && !codeValue) {
      dispatch(initialize('page', {
        titles: {
          [mainTitleLangCode]: 'Hello World App',
        },
        code: 'hello_world_app',
        ownerGroup: 'free',
        parentCode: 'homepage',
        ...appTourLastPageData,
      }));
    }
  },
  onSubmit: (data, action) =>
    dispatch(sendPostPage(data)).then((res) => {
      if (res) {
        const redirectTo = getSearchParam('redirectTo');
        switch (action) {
          case ACTION_SAVE: {
            if (redirectTo) {
              const hasPageCode = redirectTo.includes(':pageCode');
              const redirectToUrl = hasPageCode
                ? routeConverter(redirectTo, { pageCode: data.code }) : redirectTo;
              history.push(redirectToUrl);
            } else {
              history.push(ROUTE_PAGE_TREE);
            }
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
    if (appTourProgress === APP_TOUR_STARTED && newValue) {
      dispatch(setAppTourLastStep(10));
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(PageForm);
