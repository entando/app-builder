import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { fetchUserForm, sendPostWizardSetting } from 'state/users/actions';
import { getUsername } from '@entando/apimanager';

import AppTour from 'ui/dashboard/AppTour';
import { getAppTourlastStep, getAppTourProgress, getPublishStatus, getTourCreatedPage } from 'state/app-tour/selectors';
import { getActiveLanguages } from 'state/languages/selectors';
import { setAppTourLastStep, setAppTourProgress, setPublishStatus } from 'state/app-tour/actions';

import { APP_TOUR_CANCELLED, APP_TOUR_STARTED } from 'state/app-tour/const';
import { sendDeletePage, unpublishSelectedPage } from 'state/pages/actions';
import { ROUTE_PAGE_TREE } from 'app-init/router';
import { getConfigMap } from 'state/page-config/selectors';

// const REQUIRED_WIDGET_CODES = ['header', 'footer', 'navigation', 'content_viewer'];
const REQUIRED_WIDGET_CODES = ['dsadas'];

export const mapStateToProps = (state, { lockBodyScroll = true }) => {
  const languages = getActiveLanguages(state);
  const mainTitleLangCode = (languages[0] || {}).code || 'en';
  const mainTitleName = `titles.${mainTitleLangCode}`;
  const pageCode = (getTourCreatedPage(state) || {}).code || '';
  const configMap = getConfigMap(state)[pageCode] || [];
  const pageConfigValid =
  REQUIRED_WIDGET_CODES.every(widgetCode => configMap.filter(widget =>
    widget && widget.code === widgetCode).length > 0);
  return {
    username: getUsername(state),
    wizardEnabled: formValueSelector('user')(state, 'wizardEnabled') || true,
    appTourProgress: getAppTourProgress(state),
    appTourLastStep: getAppTourlastStep(state),
    mainTitleValue: formValueSelector('page')(state, mainTitleName),
    codeValue: formValueSelector('page')(state, 'code'),
    ownerGroupValue: formValueSelector('page')(state, 'ownerGroup'),
    parentCodeValue: formValueSelector('page')(state, 'parentCode'),
    pageModelValue: formValueSelector('page')(state, 'pageModel'),
    lockBodyScroll,
    tourCreatedPageCode: pageCode,
    pageConfigValid,
    publishStatus: getPublishStatus(state),
  };
};
export const mapDispatchToProps = (dispatch, { history }) => ({
  onDidMount: ({ username }) => { dispatch(fetchUserForm(username)); },
  onToggleDontShow: (disableWizard, username) => {
    dispatch(sendPostWizardSetting({ wizardEnabled: !disableWizard, username }));
  },
  onAppTourStart: () => dispatch(setAppTourProgress(APP_TOUR_STARTED)),
  onAppTourCancel: (code, publishStatus) => {
    if (code && !publishStatus) {
      dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_STARTED }));
    }
    dispatch(setAppTourProgress(APP_TOUR_CANCELLED));
    dispatch(setAppTourLastStep(1));
  },
  setNextStep: step => dispatch(setAppTourLastStep(step)),
  onBackToAddPage: (code) => {
    dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_STARTED }));
    dispatch(setAppTourLastStep(11));
  },
  onBackToPageTree: () => {
    history.push(ROUTE_PAGE_TREE);
    dispatch(setAppTourLastStep(5));
  },
  unpublishPage: () => {
    dispatch(unpublishSelectedPage()).then(() => {
      dispatch(setPublishStatus(false));
    });
    dispatch(setAppTourLastStep(13));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTour));
