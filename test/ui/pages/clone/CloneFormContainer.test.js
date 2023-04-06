
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/clone/CloneFormContainer';

import { history, ROUTE_PAGE_TREE } from 'app-init/router';
// mocked
import { DASHBOARD_PAYLOAD } from 'test/mocks/pages';
import { sendClonePage } from 'state/pages/actions';
import { ACTION_SAVE } from 'state/pages/const';
import { getActiveLanguages } from 'state/languages/selectors';
import { LANGUAGES_LIST as LANGUAGES } from 'test/mocks/languages';

jest.mock('state/pages/actions', () => ({
  sendClonePage: jest.fn(() => Promise.resolve({})),
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

    it('maps the "onSubmit" prop a sendClonePage dispatch', (done) => {
      expect(props).toHaveProperty('onSubmit');
      props.onSubmit({ ...DASHBOARD_PAYLOAD, action: ACTION_SAVE }).then(() => {
        expect(sendClonePage).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledWith(ROUTE_PAGE_TREE);
        done();
      }).catch(done.fail);
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
