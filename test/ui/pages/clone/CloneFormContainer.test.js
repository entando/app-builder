
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/clone/CloneFormContainer';

import { history, ROUTE_PAGE_TREE } from 'app-init/router';
// mocked
import { formValueSelector, change } from 'redux-form';
import { getGroupsList } from 'state/groups/selectors';
import { getPageTemplatesList } from 'state/page-templates/selectors';
import { getCharsets, getContentTypes } from 'state/pages/selectors';
import { DASHBOARD_PAYLOAD } from 'test/mocks/pages';
import { sendPostPage } from 'state/pages/actions';
import { ACTION_SAVE } from 'state/pages/const';
import { getActiveLanguages } from 'state/languages/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

jest.mock('state/pages/actions', () => ({
  sendPostPage: jest.fn(() => Promise.resolve({})),
}));

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn().mockReturnValue('getGroupsList_result'),
}));
jest.mock('state/page-templates/selectors', () => ({
  getPageTemplatesList: jest.fn().mockReturnValue('getPageTemplates_result'),
}));
jest.mock('state/pages/selectors', () => ({
  getCharsets: jest.fn().mockReturnValue('getCharsets_result'),
  getContentTypes: jest.fn().mockReturnValue('getContentTypes_result'),
}));
jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn(),
}));
jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

getActiveLanguages.mockReturnValue(LANGUAGES);

const STATE = {
  pages: {},
};

describe('CloneFormContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(STATE);
    });

    it('maps the "languages" prop with the getActiveLanguages selector', () => {
      expect(getActiveLanguages).toHaveBeenCalled();
      expect(props).toHaveProperty('languages', LANGUAGES);
    });

    it('maps the "groups" prop with the getGroupsList selector', () => {
      expect(getGroupsList).toHaveBeenCalledWith(STATE);
      expect(props.groups).toBe('getGroupsList_result');
    });

    it('maps the "pageTemplates" prop with the getPageTemplates selector', () => {
      expect(getPageTemplatesList).toHaveBeenCalledWith(STATE);
      expect(props.pageTemplates).toBe('getPageTemplates_result');
    });

    it('maps the "charsets" prop with the getCharsets selector', () => {
      expect(getCharsets).toHaveBeenCalledWith(STATE);
      expect(props.charsets).toBe('getCharsets_result');
    });

    it('maps the "contentTypes" prop with the getContentTypes selector', () => {
      expect(getContentTypes).toHaveBeenCalledWith(STATE);
      expect(props.contentTypes).toBe('getContentTypes_result');
    });

    it('maps the "selectedJoinGroups" prop with the correct values from redux-form', () => {
      expect(formValueSelector).toHaveBeenCalledWith('page');
    });

    it('maps the "mode" prop with the "clone" value', () => {
      expect(props.mode).toBe('clone');
    });

    it('defines keepDirtyOnReinitialize with value equals true', () => {
      expect(props.keepDirtyOnReinitialize).toBe(true);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn(args => args);
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onSubmit" prop a sendPostPage dispatch', (done) => {
      expect(props).toHaveProperty('onSubmit');
      props.onSubmit({ ...DASHBOARD_PAYLOAD, action: ACTION_SAVE }).then(() => {
        expect(sendPostPage).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
        done();
      }).catch(done.fail);
    });

    it('maps the "onChangeDefaultTitle" prop a redux-form change dispatch', () => {
      expect(props).toHaveProperty('onChangeDefaultTitle');
      props.onChangeDefaultTitle('En Title');
      expect(change).toHaveBeenCalledWith('page', 'code', 'en_title');
    });


    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount();
      });

      it('dispatch fetchLanguages', () => {
        expect(dispatchMock).toHaveBeenCalled();
      });
    });
  });
});
