import {
  setAppTourProgress, setAppTourLastStep, setWizardEnabled,
  setTourCreatedPage, clearAppTourProgress, setPublishStatus,
  setExistingPages,
} from 'state/app-tour/actions';

import {
  SET_APP_TOUR_PROGRESS, SET_APP_TOUR_LAST_STEP, SET_WIZARD_ENABLED,
  CLEAR_APP_TOUR_PROGRESS, SET_TOUR_CREATED_PAGE, SET_PUBLISH_STATUS,
  SET_EXISTING_PAGES,
} from 'state/app-tour/types';

describe('state/app-tour/actions', () => {
  describe('setAppTourProgress', () => {
    it('test setAppTourProgress action sets the correct type', () => {
      const action = setAppTourProgress('started');
      expect(action.type).toEqual(SET_APP_TOUR_PROGRESS);
      expect(action.payload).toEqual('started');
    });
  });

  describe('setAppTourLastStep', () => {
    it('test setAppTourLastStep action sets the correct type', () => {
      const action = setAppTourLastStep(12);
      expect(action.type).toEqual(SET_APP_TOUR_LAST_STEP);
      expect(action.payload).toEqual(12);
    });
  });

  describe('setTourCreatedPage', () => {
    it('test setTourCreatedPage action sets the correct type', () => {
      const page = { code: 'pg' };
      const action = setTourCreatedPage(page);
      expect(action.type).toEqual(SET_TOUR_CREATED_PAGE);
      expect(action.payload).toEqual(page);
    });
  });

  describe('clearAppTourProgress', () => {
    it('test clearAppTourProgress action sets the correct type', () => {
      const action = clearAppTourProgress();
      expect(action.type).toEqual(CLEAR_APP_TOUR_PROGRESS);
      expect(action.payload).toEqual(undefined);
    });
  });

  describe('setPublishStatus', () => {
    it('test setPublishStatus action sets the correct type', () => {
      const action = setPublishStatus('published');
      expect(action.type).toEqual(SET_PUBLISH_STATUS);
      expect(action.payload).toEqual('published');
    });
  });

  describe('setWizardEnabled', () => {
    it('test setWizardEnabled action sets the correct type', () => {
      const action = setWizardEnabled(true);
      expect(action.type).toEqual(SET_WIZARD_ENABLED);
      expect(action.payload).toEqual(true);
    });
  });

  describe('setExistingPages', () => {
    it('test setExistingPages action sets the correct type', () => {
      const pages = [{ code: '1' }];
      const action = setExistingPages(pages);
      expect(action.type).toEqual(SET_EXISTING_PAGES);
      expect(action.payload).toEqual(pages);
    });
  });
});
