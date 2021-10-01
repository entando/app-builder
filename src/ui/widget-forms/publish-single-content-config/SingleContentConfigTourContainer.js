import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';

import SingleContentConfigTour from 'ui/widget-forms/publish-single-content-config/SingleContentConfigTour';
import { selectSingleRow } from 'state/contents/actions';
import { getAppTourlastStep, getAppTourProgress, getPublishStatus, getTourCreatedPage, getWizardEnabled } from 'state/app-tour/selectors';
import { getContents } from 'state/contents/selectors';
import { setAppTourLastStep, setAppTourProgress } from 'state/app-tour/actions';

import { APP_TOUR_CANCELLED } from 'state/app-tour/const';
import { sendDeletePage } from 'state/pages/actions';

export const mapStateToProps = (state, { lockBodyScroll = true }) => {
  const pageCode = (getTourCreatedPage(state) || {}).code || '';
  return {
    username: getUsername(state),
    wizardEnabled: getWizardEnabled(state),
    appTourProgress: getAppTourProgress(state),
    appTourLastStep: getAppTourlastStep(state),
    lockBodyScroll,
    tourCreatedPageCode: pageCode,
    publishStatus: getPublishStatus(state),
    contents: getContents(state),
  };
};
export const mapDispatchToProps = dispatch => ({
  onAppTourCancel: (code, publishStatus) => {
    if (code && !publishStatus) {
      dispatch(sendDeletePage({ code, tourProgress: APP_TOUR_CANCELLED }));
    }
    dispatch(setAppTourProgress(APP_TOUR_CANCELLED));
    dispatch(setAppTourLastStep(1));
  },
  setNextStep: step => dispatch(setAppTourLastStep(step)),
  onNextSelectContent: (content) => {
    dispatch(selectSingleRow(content));
    dispatch(setAppTourLastStep(20));
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleContentConfigTour));
