import React from 'react';
import { configEnzymeAdapter, shallowWithIntl } from 'test/legacyTestUtils';
import { CONTENT_TYPES_OK_PAGE } from 'test/mocks/contentType';

import ContentTypeList from 'ui/content-type/ContentTypeList';

configEnzymeAdapter();

const contentTypes = CONTENT_TYPES_OK_PAGE.payload;

jest.mock('state/content-type/selectors', () => ({
  getContentTypeList: jest.fn(),
}));

const props = {
  onDidMount: jest.fn(),
  onClickDelete: jest.fn(),
  onClickReload: jest.fn(),
  status: '0',
};

describe('ContentTypeList', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(
      <ContentTypeList
        {...props}
        contentTypes={contentTypes}
        page={1}
        pageSize={1}
        totalItems={1}
      />,
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('errors without a page', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(
      <ContentTypeList contentTypes={contentTypes} pageSize={1} totalItems={1} {...props} />,
    );
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without a pageSize', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(
      <ContentTypeList contentTypes={contentTypes} page={1} totalItems={1} {...props} />,
    );
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  it('errors without totalItems', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallowWithIntl(
      <ContentTypeList contentTypes={contentTypes} pageSize={1} page={1} {...props} />,
    );
    expect(consoleError).toHaveBeenCalled();
    consoleError.mockReset();
    consoleError.mockRestore();
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(
        <ContentTypeList
          contentTypes={contentTypes}
          page={1}
          pageSize={1}
          totalItems={1}
          {...props}
        />,
      );
    });

    describe('with contentTypes', () => {
      beforeEach(() => {
        component.setProps({ contentTypes });
      });

      it('has ContentTypeListItem with DropdownKebab each row', () => {
        component.find('tbody tr').forEach((tr) => {
          expect(tr.find('ContentTypeListItem')).toHaveLength(1);
          expect(tr.find('DropdownKebab')).toHaveLength(1);
        });
      });

      it('has a paginator', () => {
        const paginator = component.dive().find('Paginator');
        expect(paginator).toHaveLength(1);
      });
    });
  });
});
