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


  it('has a table', () => {
    expect(component.find('table')).toHaveLength(1);
  });

  it('has a table header', () => {
    const thead = component.find('thead');
    expect(thead).toHaveLength(1);
    expect(thead.find('th')).toHaveLength(3);
  });

  it('has no rows', () => {
    const tbody = component.find('tbody');
    expect(tbody).toHaveLength(1);
    expect(tbody.find('tr')).toHaveLength(0);
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

    it('has as many rows as the page templates count', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(PAGE_TEMPLATES_LIST.length);
    });

    it('has a menu in the action column of each row', () => {
      component.find('tbody tr').forEach((tr) => {
        expect(tr.find('PageTemplateListMenuActions')).toHaveLength(1);
      });
    });

    it('calls removePageTemplate(pageTemplateCode) if calling a menu onClickDelete prop', () => {
      component.find('tbody tr').forEach((tr, i) => {
        const deleteFunc = tr.find('PageTemplateListMenuActions').prop('onClickDelete');
        deleteFunc();
        expect(removePageTemplate).toHaveBeenCalledWith(PAGE_TEMPLATES_LIST[i].code);
        removePageTemplate.mockClear();
      });
    });
  });
});
