import React from 'react';
import 'test/enzyme-init';
import { PROFILE_TYPES_OK_PAGE_1 } from 'test/mocks/profileTypes';


import ProfileTypeListTable from 'ui/profile-types/list/ProfileTypeListTable';
import { shallowWithIntl } from 'test/legacyTestUtils';

const profileTypes = PROFILE_TYPES_OK_PAGE_1.payload;

jest.mock('state/profile-types/selectors', () => ({
  getProfileTypeList: jest.fn(),
}));

describe('ProfileTypeListTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<ProfileTypeListTable
      profiletype={profileTypes}
      page={1}
      pageSize={1}
      totalItems={1}
      removeProfileType={() => {}}
      status="0"
    />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<ProfileTypeListTable
      profiletype={profileTypes}
      pageSize={1}
      totalItems={1}
    />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<ProfileTypeListTable page={1} totalItems={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(<ProfileTypeListTable pageSize={1} page={1} />);
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<ProfileTypeListTable
        page={1}
        pageSize={1}
        totalItems={1}
      />).dive();
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with profileTypes', () => {
      beforeEach(() => {
        component.setProps({ profiletypes: profileTypes });
      });

      it('has two rows if there are two profile types', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(2);
        expect(tbody.find('ProfileTypeListMenuActions')).toHaveLength(2);
      });

      it('has a menu in the action column of each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('ProfileTypeListMenuActions')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
