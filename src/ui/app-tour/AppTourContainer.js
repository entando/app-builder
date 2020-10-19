import { connect } from 'react-redux';
import { arrayPop, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { sendPostWizardSetting } from 'state/users/actions';
import { getUsername } from '@entando/apimanager';

import AppTour from 'ui/app-tour/AppTour';
import { getAppTourlastStep, getAppTourProgress, getPublishStatus, getTourCreatedPage, getWizardEnabled } from 'state/app-tour/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { fetchWizardEnabled, setAppTourLastStep, setAppTourProgress, setPublishStatus } from 'state/app-tour/actions';

import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';
import { sendDeletePage, unpublishSelectedPage } from 'state/pages/actions';
import { ROUTE_PAGE_ADD, ROUTE_PAGE_TREE } from 'app-init/router';
import { configOrUpdatePageWidget, editWidgetConfig } from 'state/page-config/actions';
import { NavigationBarWidgetID } from 'ui/widgets/config/forms/NavigationBarConfigFormContainer';

export const widgetNextSteps = {
  logo: 13,
  'navigation-menu': 14,
  content_viewer: 18,
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
    specificChosenPage: formValueSelector('navigationBarWidgetForm')(state, 'addConfig.targetCode'),
  };
};
export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: ({ username }) => { dispatch(fetchWizardEnabled(username)); },
  onToggleDontShow: (disableWizard, username) => {
    // TODO change this to new API
    dispatch(sendPostWizardSetting(username, { wizardEnabled: !disableWizard, showToast: false }));
  },
  onAppTourStart: () => dispatch(setAppTourProgress(APP_TOUR_STARTED)),
  onAppTourCancel: (code, publishStatus) => {
    if (code && !publishStatus) {
      dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_CANCELLED }));
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
    dispatch(setAppTourLastStep(22));
  },
  onAddLogo: (pageCode) => {
    dispatch(configOrUpdatePageWidget('logo', undefined, 0, pageCode));
    dispatch(setAppTourLastStep(13));
  },
  onAddNavigationMenu: (pageCode) => {
    dispatch(configOrUpdatePageWidget('navigation-menu', undefined, 1, pageCode));
    dispatch(setAppTourLastStep(14));
  },
  onBackToSpecificCode: () => {
    dispatch(arrayPop(NavigationBarWidgetID, 'expressions'));
    dispatch(setAppTourLastStep(14));
  },
  onAddContent: (pageCode) => {
    dispatch(configOrUpdatePageWidget('content_viewer', undefined, 4, pageCode));
    dispatch(setAppTourLastStep(18));
  },
  onBackToNavMenuConfig: (pageCode) => {
    dispatch(editWidgetConfig(1, pageCode));
    dispatch(setAppTourLastStep(16));
  },
  onBackToContentConfig: (pageCode) => {
    dispatch(editWidgetConfig(4, pageCode));
    dispatch(setAppTourLastStep(21));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTour));
