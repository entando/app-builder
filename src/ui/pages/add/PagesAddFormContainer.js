import { connect } from 'react-redux';
import { formValueSelector, change, initialize } from 'redux-form';
import { routeConverter } from '@entando/utils';

import { ACTION_SAVE, ACTION_SAVE_AND_CONFIGURE, SEO_ENABLED } from 'state/pages/const';
import PageForm from 'ui/pages/common/PageForm';
import { fetchLanguages } from 'state/languages/actions';
import { getActiveLanguages } from 'state/languages/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes, getSelectedPageLocaleTitle } from 'state/pages/selectors';
import { sendPostPage, loadSelectedPage } from 'state/pages/actions';
import { history, ROUTE_PAGE_TREE, ROUTE_PAGE_CONFIG } from 'app-init/router';
import { PAGE_INIT_VALUES, SEO_DATA_BLANK, SEO_LANGDATA_BLANK } from 'ui/pages/common/const';
import { getLocale } from 'state/locale/selectors';
import getSearchParam from 'helpers/getSearchParam';
import { setVisibleModal } from 'state/modal/actions';
import { getAppTourProgress, getTourCreatedPage, getExistingPages } from 'state/app-tour/selectors';
import { APP_TOUR_STARTED, APP_TOUR_HOMEPAGE_CODEREF } from 'state/app-tour/const';
import { setAppTourLastStep, setTourCreatedPage } from 'state/app-tour/actions';
import { getUserPreferences } from 'state/user-preferences/selectors';
import { MANAGE_PAGES_PERMISSION, SUPERUSER_PERMISSION } from 'state/permissions/const';
import { getMyGroupPermissions } from 'state/permissions/selectors';
import { fetchMyGroupPermissions } from 'state/permissions/actions';
import { fetchAllGroupEntries, fetchMyGroups } from 'state/groups/actions';
import { getGroupEntries, getGroupsList } from 'state/groups/selectors';

export const getDefaultLanguage = (languages) => {
  const defaultLang = { code: 'en' };
  if (!languages || languages.length === 0) return defaultLang;
  const defaultFiltered = languages.filter(lang => lang.isDefault);
  if (defaultFiltered && defaultFiltered.length > 0) return defaultFiltered[0];
  return defaultLang;
};

export const complementTitlesForActiveLanguages = (existingTitles, languages) => {
  const defaultLang = getDefaultLanguage(languages);
  const defaultLangTitle = existingTitles && existingTitles[defaultLang.code];
  return languages.reduce((acc, curr) => ({
    ...acc,
    [curr.code]: existingTitles[curr.code] || defaultLangTitle,
  }), {});
};

const getNextPageProperty = ({
  pages,
  property,
  pattern,
  separator,
}) => {
  const indexes = pages
    .map(page => page[property])
    .filter(Boolean)
    .map((propertyValue) => {
      const regex = new RegExp(`${pattern}[${separator}]*(?<currentIndex>\\d)*$`);
      const result = propertyValue.match(regex);
      if (!result) {
        return null;
      }
      const currentIndexStr = result.groups.currentIndex;
      return currentIndexStr ? Number(currentIndexStr) : 1;
    })
    .filter(Boolean);
  const nextIndex = !indexes.length ? null : Math.max(...indexes) + 1;
  return `${pattern}${nextIndex ? `${separator}${nextIndex}` : ''}`;
};

export const getNextPageName = ({ pages, pattern, separator }) => getNextPageProperty({
  pages,
  property: 'name',
  pattern,
  separator,
});

export const getNextPageCode = ({ pages, pattern, separator }) => getNextPageProperty({
  pages,
  property: 'code',
  pattern,
  separator,
});

export const mapStateToProps = (state) => {
  const languages = getActiveLanguages(state);
  const groups = getGroupsList(state);
  const allGroups = getGroupEntries(state);
  const seoDataByLang = languages.reduce((acc, curr) => ({
    ...acc,
    [curr.code]: { ...SEO_LANGDATA_BLANK },
  }), {});
  const userPreferences = getUserPreferences(state);
  const groupWithPagePermission = getMyGroupPermissions(state)
    .find(({ permissions }) => (
      permissions.includes(SUPERUSER_PERMISSION) || permissions.includes(MANAGE_PAGES_PERMISSION)
    ));
  const defaultOwnerGroup = userPreferences.defaultPageOwnerGroup
    || (groupWithPagePermission && groupWithPagePermission.group);
  const joinGroups = userPreferences.defaultPageJoinGroups;
  const appTourProgress = getAppTourProgress(state);
  const mainTitleLangCode = (languages[0] || {}).code || 'en';
  const mainTitleName = `titles.${mainTitleLangCode}`;
  const appTourLastPageData = getTourCreatedPage(state);
  const parentCode = getSearchParam('parentCode');
  const existingPages = (getExistingPages(state) || []).map(page =>
    ({ ...page, name: page.titles[mainTitleLangCode] }));
  const pageName = getNextPageName({ pages: existingPages, pattern: 'Hello World App', separator: ' ' });
  const pageCode = getNextPageCode({ pages: existingPages, pattern: 'hello_world_app', separator: '_' });

  return {
    languages,
    groups,
    allGroups,
    pageTemplates: getPageTemplatesList(state),
    charsets: getCharsets(state),
    contentTypes: getContentTypes(state),
    seoMode: SEO_ENABLED,
    initialValues: {
      ...PAGE_INIT_VALUES,
      seoData: {
        ...SEO_DATA_BLANK,
        seoDataByLang,
      },
      ownerGroup: defaultOwnerGroup,
      joinGroups,
      ...(parentCode ? { parentCode } : {}),
      ...(appTourProgress === APP_TOUR_STARTED && {
        titles: {
          [mainTitleLangCode]: pageName,
        },
        code: pageCode,
        ownerGroup: 'free',
        parentCode: APP_TOUR_HOMEPAGE_CODEREF,
        pageModel: '1-column',
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
    dispatch(fetchMyGroupPermissions({ sort: 'group' }));
    dispatch(fetchAllGroupEntries());
    dispatch(fetchMyGroups({ sort: 'name' }));
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
        parentCode: APP_TOUR_HOMEPAGE_CODEREF,
        pageModel: '1-column',
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
