import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';

import AppTour from 'ui/app-tour/AppTour';
import { getAppTourlastStep, getAppTourProgress, getPublishStatus, getTourCreatedPage, getWizardEnabled } from 'state/app-tour/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { fetchWizardEnabled, setAppTourLastStep, setAppTourProgress, setPublishStatus } from 'state/app-tour/actions';
import { updateConfiguredPageWidget } from 'state/widget-config/actions';

import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';
import { SAMPLE_HOMEPAGE_CODE, sendDeletePage, unpublishSelectedPage } from 'state/pages/actions';
import { ROUTE_DASHBOARD, ROUTE_PAGE_ADD, ROUTE_PAGE_TREE } from 'app-init/router';
import { initConfigPage, configOrUpdatePageWidget } from 'state/page-config/actions';
import { updateUserPreferences } from 'state/user-preferences/actions';

export const widgetNextSteps = {
  logo: 13,
  search_form: 15,
  'keycloak-login': 16,
};

export const mapStateToProps = (state, { lockBodyScroll = true }) => {
  const languages = getActiveLanguages(state);
  const mainTitleLangCode = (languages[0] || {}).code || 'en';
  const mainTitleName = `titles.${mainTitleLangCode}`;
  const pageCode = (getTourCreatedPage(state) || {}).code || '';
  return {
    username: getUsername(state),
    wizardEnabled: getWizardEnabled(state),
    appTourProgress: getAppTourProgress(state),
    appTourLastStep: getAppTourlastStep(state),
    mainTitleValue: formValueSelector('page')(state, mainTitleName),
    codeValue: formValueSelector('page')(state, 'code'),
    ownerGroupValue: formValueSelector('page')(state, 'ownerGroup'),
    parentCodeValue: formValueSelector('page')(state, 'parentCode'),
    pageModelValue: formValueSelector('page')(state, 'pageModel'),
    lockBodyScroll,
    tourCreatedPageCode: pageCode,
    publishStatus: getPublishStatus(state),
  };
};
export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: ({ username }) => { dispatch(fetchWizardEnabled(username)); },
  onToggleDontShow: (disableWizard, username) => {
    dispatch(updateUserPreferences(username, { wizard: !disableWizard, showToast: false }));
  },
  onAppTourStart: () => dispatch(setAppTourProgress(APP_TOUR_STARTED)),
  onAppTourCancel: (code, publishStatus, noRouting) => {
    if (code && !publishStatus) {
      dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_CANCELLED }));
    }
    if (!noRouting) {
      history.push(ROUTE_DASHBOARD);
    }
    dispatch(setAppTourProgress(APP_TOUR_CANCELLED));
    dispatch(setAppTourLastStep(1));
  },
  setNextStep: step => dispatch(setAppTourLastStep(step)),
  onBackToAddPage: (code) => {
    history.push(ROUTE_PAGE_ADD);
    dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_STARTED }))
      .then(() => dispatch(setAppTourLastStep(11)));
  },
  onBackToPageTree: () => {
    history.push(ROUTE_PAGE_TREE);
    dispatch(setAppTourLastStep(5));
  },
  unpublishPage: () => {
    dispatch(unpublishSelectedPage()).then(() => {
      dispatch(setPublishStatus(false));
    });
    dispatch(setAppTourLastStep(18));
  },
  onAddLogo: (pageCode) => {
    dispatch(configOrUpdatePageWidget('logo', undefined, 0, pageCode));
    dispatch(setAppTourLastStep(13));
  },
  onAddNavBarWidget: (pageCode) => {
    dispatch(setAppTourLastStep(14));
    dispatch(updateConfiguredPageWidget(
      { navSpec: `code(${SAMPLE_HOMEPAGE_CODE}) + code(${SAMPLE_HOMEPAGE_CODE}).children` },
      { pageCode, framePos: 1, widgetCode: 'navigation-menu' },
    )).then(() => dispatch(initConfigPage(pageCode)));
  },
  onAddSearchWidget: (pageCode) => {
    dispatch(configOrUpdatePageWidget('search_form', undefined, 2, pageCode));
    dispatch(setAppTourLastStep(15));
  },
  onAddLoginWidget: (pageCode) => {
    dispatch(configOrUpdatePageWidget('keycloak-login', undefined, 3, pageCode));
    dispatch(setAppTourLastStep(16));
  },
  onAddBannerWidget: (pageCode) => {
    dispatch(setAppTourLastStep(17));
    dispatch(updateConfiguredPageWidget(
      {
        contentDescription: 'A Modern Platform for Modern UX',
        contentId: 'BNR3',
        joinGroups: '[]',
        ownerGroup: 'free',
      },
      { pageCode, framePos: 4, widgetCode: 'content_viewer' },
    )).then(() => dispatch(initConfigPage(pageCode)));
  },
  onAddContentListWidget: (pageCode) => {
    dispatch(setAppTourLastStep(18));
    dispatch(updateConfiguredPageWidget(
      {
        ownerGroup: 'free',
        joinGroups: [],
        contents: [
          { contentId: 'NWS4', modelId: '10021', contentDescription: 'Why You Need a Micro Frontend Platform for Kubernetes' },
          { contentId: 'NWS5', modelId: '10021', contentDescription: 'Entando and JHipster: How It Works' },
        ],
      },
      { pageCode, framePos: 5, widgetCode: 'row_content_viewer_list' },
    )).then(() => dispatch(initConfigPage(pageCode)));
  },
  onAddSitemapMenu: (pageCode) => {
    dispatch(setAppTourLastStep(19));
    dispatch(updateConfiguredPageWidget(
      { navSpec: 'code(sitemap)' },
      { pageCode, framePos: 8, widgetCode: 'navigation-menu' },
    )).then(() => dispatch(initConfigPage(pageCode)));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTour));
