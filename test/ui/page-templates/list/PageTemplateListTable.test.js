import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import PageTemplateListTable from 'ui/page-templates/list/PageTemplateListTable';
import { PAGE_TEMPLATES_LIST } from 'test/mocks/pageTemplates';

global.console.error = jest.fn();
const onWillMount = jest.fn();
const removePageTemplate = jest.fn();

const TOTAL_ITEMS = 100;
const PAGE_SIZE = 10;
const PAGE = 1;


beforeEach(jest.clearAllMocks);
describe('PageTemplateListTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl((
      <PageTemplateListTable
        page={PAGE}
        pageSize={PAGE_SIZE}
        totalItems={TOTAL_ITEMS}
        onWillMount={onWillMount}
        columnOrder={[]}
        removePageTemplate={removePageTemplate}
      />
    )).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('on mount, it calls onWillMount', () => {
    expect(onWillMount).toHaveBeenCalled();
  });

  describe('required props', () => {
    it('errors without a page', () => {
      // eslint-disable-next-line max-len
      shallowWithIntl(<PageTemplateListTable pageSize={PAGE_SIZE} totalItems={TOTAL_ITEMS} />).dive();
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without a pageSize', () => {
      shallowWithIntl(<PageTemplateListTable page={PAGE} totalItems={TOTAL_ITEMS} />).dive();
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without totalItems', () => {
      shallowWithIntl(<PageTemplateListTable pageSize={PAGE_SIZE} page={PAGE} />).dive();
      expect(global.console.error).toHaveBeenCalled();
    });
  });


  it('has DataTable', () => {
    expect(component.find('DataTable')).toHaveLength(1);
  });

  it('has a paginator', () => {
    expect(component.find('Paginator')).toHaveLength(1);
  });

  it('has a delete page-template modal', () => {
    expect(component.find('PageTemplateDeleteModalContainer')).toHaveLength(1);
  });

  it('on change page, it calls onWillMount with new page data', () => {
    onWillMount.mockClear();
    component.instance().changePage(3);
    expect(onWillMount).toHaveBeenCalledWith({
      page: 3,
      pageSize: PAGE_SIZE,
    });
  });

  it('on change page size, it calls onWillMount with new page data', () => {
    onWillMount.mockClear();
    component.instance().changePageSize(20);
    expect(onWillMount).toHaveBeenCalledWith({
      page: PAGE,
      pageSize: 20,
    });
  });

  describe('with page templates', () => {
    beforeEach(() => {
      component.setProps({ pageTemplates: PAGE_TEMPLATES_LIST });
      component.update();
    });

  });
});
