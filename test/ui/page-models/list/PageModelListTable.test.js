import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import PageModelListTable from 'ui/page-models/list/PageModelListTable';
import { PAGE_MODELS_LIST } from 'test/mocks/pageModels';

global.console.error = jest.fn();
const onWillMount = jest.fn();
const removePageModel = jest.fn();

const TOTAL_ITEMS = 100;
const PAGE_SIZE = 10;
const PAGE = 1;


beforeEach(jest.clearAllMocks);
describe('PageModelListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow((
      <PageModelListTable
        page={PAGE}
        pageSize={PAGE_SIZE}
        totalItems={TOTAL_ITEMS}
        onWillMount={onWillMount}
        removePageModel={removePageModel}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('on mount, it calls onWillMount', () => {
    expect(onWillMount).toHaveBeenCalled();
  });

  describe('required props', () => {
    it('errors without a page', () => {
      shallow(<PageModelListTable pageSize={PAGE_SIZE} totalItems={TOTAL_ITEMS} />);
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without a pageSize', () => {
      shallow(<PageModelListTable page={PAGE} totalItems={TOTAL_ITEMS} />);
      expect(global.console.error).toHaveBeenCalled();
    });

    it('errors without totalItems', () => {
      shallow(<PageModelListTable pageSize={PAGE_SIZE} page={PAGE} />);
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

  describe('with page models', () => {
    beforeEach(() => {
      component.setProps({ pageModels: PAGE_MODELS_LIST });
      component.update();
    });

    it('has as many rows as the page models count', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(PAGE_MODELS_LIST.length);
    });

    it('has a menu in the action column of each row', () => {
      component.find('tbody tr').forEach((tr) => {
        expect(tr.find('PageModelListMenuActions')).toHaveLength(1);
      });
    });

    it('calls removePageModel(pageModelCode) if calling a menu onClickDelete prop', () => {
      component.find('tbody tr').forEach((tr, i) => {
        const deleteFunc = tr.find('PageModelListMenuActions').prop('onClickDelete');
        deleteFunc();
        expect(removePageModel).toHaveBeenCalledWith(PAGE_MODELS_LIST[i].code);
        removePageModel.mockClear();
      });
    });
  });
});
