import {
  getAppTourProgress, getAppTourlastStep,
  getTourCreatedPage, getPublishStatus,
  getWizardEnabled, getExistingPages,
} from 'state/app-tour/selectors';

const TEST_STATE = {
  appTour: {
    appTourProgress: 'started',
    lastStep: 10,
    page: { code: 'tst' },
    status: 'published',
    wizardEnabled: true,
    existingPages: [{ code: '1' }],
  },
};

describe('state/app-tour/selectors', () => {
  it('verify getAppTourProgress selector', () => {
    expect(getAppTourProgress(TEST_STATE))
      .toEqual(TEST_STATE.appTour.appTourProgress);
  });

  it('verify getAppTourlastStep selector', () => {
    expect(getAppTourlastStep(TEST_STATE))
      .toEqual(TEST_STATE.appTour.lastStep);
  });

  it('verify getTourCreatedPage selector', () => {
    expect(getTourCreatedPage(TEST_STATE))
      .toEqual(TEST_STATE.appTour.page);
  });

  it('verify getPublishStatus selector', () => {
    expect(getPublishStatus(TEST_STATE))
      .toEqual(TEST_STATE.appTour.status);
  });

  it('verify getWizardEnabled selector', () => {
    expect(getWizardEnabled(TEST_STATE))
      .toEqual(TEST_STATE.appTour.wizardEnabled);
  });

  it('verify getExistingPages selector', () => {
    expect(getExistingPages(TEST_STATE))
      .toEqual(TEST_STATE.appTour.existingPages);
  });
});
