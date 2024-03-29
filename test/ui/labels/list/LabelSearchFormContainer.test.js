import 'test/enzyme-init';

import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { mapDispatchToProps } from 'ui/labels/list/LabelSearchFormContainer';
import { fetchLabels, setLabelFilters } from 'state/labels/actions';

const dispatchMock = jest.fn();

const FIELD_OPERATORS = {
  text: FILTER_OPERATORS.LIKE,
  key: FILTER_OPERATORS.LIKE,
};

const TEST_VALUE = { text: 'label text', key: 'testkey' };
const page = { page: 1, pageSize: 10 };
const queryString = convertToQueryString({
  formValues: TEST_VALUE,
  operators: FIELD_OPERATORS,
});


jest.mock('state/labels/actions', () => ({
  fetchLabels: jest.fn(),
  setLabelFilters: jest.fn(),
}));

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties', () => {
    expect(props.onSubmit).toBeDefined();
  });

  it('should dispatch an action if onSubmit is called', () => {
    props.onSubmit(TEST_VALUE);
    expect(dispatchMock).toHaveBeenCalled();
    expect(setLabelFilters).toHaveBeenCalledWith({ keyword: TEST_VALUE.key });
    expect(fetchLabels).toHaveBeenCalledWith(page);
  });
});
