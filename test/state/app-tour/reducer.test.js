import reducer from 'state/app-tour/reducer';
import {
  setAppTourProgress, setAppTourLastStep, setWizardEnabled,
  setTourCreatedPage, clearAppTourProgress, setPublishStatus,
  setExistingPages,
} from 'state/app-tour/actions';
import {
  getAppTourProgress, getAppTourlastStep, getExistingPages,
  getTourCreatedPage, getPublishStatus, getWizardEnabled,
} from 'state/app-tour/selectors';

describe('state/permssions/reducer', () => {
  const state = reducer({ appTourProgress: 'started' });

  describe('default state', () => {
    it('should be an object', () => {
      expect(typeof state).toBe('object');
    });
  });

  describe('after action setAppTourProgress', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourProgress('started'));
    });

    it('should define the progress payload', () => {
      expect(getAppTourProgress({ appTour: newState })).toEqual('started');
    });
  });

  describe('after action setAppTourLastStep', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourLastStep(10));
    });

    it('should define the last step payload', () => {
      expect(getAppTourlastStep({ appTour: newState })).toEqual(10);
    });
  });

  describe('after action setTourCreatedPage', () => {
    let newState;
    const page = { code: 'test' };
    beforeEach(() => {
      newState = reducer(state, setTourCreatedPage(page));
    });

    it('should define the page payload', () => {
      expect(getTourCreatedPage({ appTour: newState })).toEqual(page);
    });
  });

  describe('after action setPublishStatus', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setPublishStatus('published'));
    });

    it('should define the publish status payload', () => {
      expect(getPublishStatus({ appTour: newState })).toEqual('published');
    });
  });

  describe('after action setWizardEnabled', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setWizardEnabled(true));
    });

    it('should define the publish status payload', () => {
      expect(getWizardEnabled({ appTour: newState })).toEqual(true);
    });
  });

  describe('after action setExistingPages', () => {
    let newState;
    const pages = [{ code: '1' }];
    beforeEach(() => {
      newState = reducer(state, setExistingPages(pages));
    });

    it('should define the publish status payload', () => {
      expect(getExistingPages({ appTour: newState })).toEqual(pages);
    });
  });

  describe('after action clearAppTourProgress', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setAppTourLastStep(10));
      newState = reducer(newState, clearAppTourProgress());
    });

    it('should define the publish status payload', () => {
      expect(getAppTourProgress({ appTour: newState })).toEqual(undefined);
      expect(getAppTourlastStep({ appTour: newState })).toEqual(undefined);
    });
  });
});
