import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import GenericRefsTable from 'ui/common/references/GenericRefsTable';

const componentDidMount = jest.fn();

const REFERENCE_KEY = 'genericRef';
const REFERENCE_LIST = [
  {
    code: 'ref_code1',
    name: 'ref_name1',
    type: 'ref_type1',
  },
  {
    code: 'ref_code2',
    name: 'ref_name2',
    type: 'ref_type2',
  },
];

describe('GenericRefsTable', () => {
  let component;
  beforeEach(() => {
    component = shallowWithIntl(<GenericRefsTable
      componentDidMount={componentDidMount}
      pagination={{}}
    />).dive();
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('renders without crashing', () => {
    expect(component.hasClass('GenericRefsTable')).toBe(true);
  });

  it('renders an Alert', () => {
    const alert = component.find('Alert');
    expect(alert).toHaveLength(1);
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallowWithIntl(<GenericRefsTable
        componentDidMount={componentDidMount}
        referenceKey={REFERENCE_KEY}
        references={REFERENCE_LIST}
        pagination={{}}
        columns={{
          code: {
                    render: item => item,
                  },
          name: {
                    render: item => item,
                  },
          type: {
                    render: item => item,
                  },
        }}
      />).dive();
    });

    it('renders a table', () => {
      const table = component.find('.GenericRefsTable__table');
      expect(table).toHaveLength(1);
    });

    it('has 3 cols if the reference has 3 property', () => {
      const thead = component.find('thead');
      expect(thead).toHaveLength(1);
      expect(thead.find('th')).toHaveLength(3);
    });

    it('has 2 row if there is 2 reference', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(2);
    });
  });
});
