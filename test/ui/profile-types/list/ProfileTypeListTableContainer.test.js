import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/profile-types/list/ProfileTypeListTableContainer';
import { PROFILE_TYPES_OK_PAGE_1 } from 'test/mocks/profileTypes';
import { getProfileTypeList } from 'state/profile-types/selectors';
import { getLoading } from 'state/loading/selectors';

const TEST_PAGINATION = {
  metaData: {
    page: 1,
    pageSize: 10,
    lastPage: 2,
    totalItems: 20,
  },
};

const TEST_STATE = {
  profileTypes: {
    list: ['ABC', 'DEF'],
    map: {
      ABC: {
        name: 'profileType1',
        code: 'ABC',
        status: 'ok',
      },
      DEF: {
        name: 'profileType2',
        code: 'DEF',
        status: 'ok',
      },
    },
  },
  pagination: {
    global: TEST_PAGINATION.metaData,
  },
};

const dispatchMock = jest.fn();

jest.mock('state/profile-types/selectors', () => ({
  getProfileTypeList: jest.fn(),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

const PROFILE_TYPES = [
  {
    name: 'profileType1',
    code: 'ABC',
    status: 'ok',
  },
  {
    name: 'profileType2',
    code: 'DEF',
    status: 'ok',
  },
];

getProfileTypeList.mockReturnValue(PROFILE_TYPES);
getLoading.mockReturnValue(false);

describe('ProfileTypeListTableContainer', () => {
  it('maps profiletype list property state in ProfileTypesListTable', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      profiletypes: PROFILE_TYPES_OK_PAGE_1.payload,
      page: TEST_STATE.pagination.global.page,
      totalItems: TEST_STATE.pagination.global.totalItems,
      pageSize: TEST_STATE.pagination.global.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
