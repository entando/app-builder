import {
  getAppTourProgress, getAppTourlastStep,
  getTourCreatedPage, getPublishStatus,
} from 'state/app-tour/selectors';

const TEST_STATE = {
  appTour: {
    appTourProgress: 'started',
    lastStep: 10,
    page: { code: 'tst' },
    status: 'published',
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
});
