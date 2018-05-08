import 'test/enzyme-init';
import { getParams } from '@entando/router';
import { mapStateToProps, mapDispatchToProps } from 'ui/categories/edit/EditFormContainer';

const CATEGORY_CODE = { categoryCode: 'category_code' };

const INITIAL_STATE = {
  categories: {
    list: [],
    map: {},
    childrenMap: {},
    titlesMap: {},
    statusMap: {},
  },
};

jest.mock('state/categories/actions', () => ({
  sendPutCategory: jest.fn().mockReturnValue('sendPutCategory_result'),
  fetchCategory: jest.fn().mockReturnValue('fetchCategory_result'),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
  getDefaultLanguage: jest.fn().mockReturnValue('defaultLanguage_result'),
}));

getParams.mockReturnValue(CATEGORY_CODE);

describe('EditFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(INITIAL_STATE);
    });

    it('maps categories, languages and loading property', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('activeLanguages', 'getActiveLanguages_result');
      expect(props).toHaveProperty('defaultLanguage', 'defaultLanguage_result');
      expect(props).toHaveProperty('categoryCode', CATEGORY_CODE.categoryCode);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchCategoryTree and fetchLanguages dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount(CATEGORY_CODE);
      expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchCategory_result');
    });

    it('maps the "onSubmit" prop a sendPutCategory dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPutCategory_result');
    });
  });
});
