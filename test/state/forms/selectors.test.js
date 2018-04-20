
import { getPageForm, getPageModelForm } from 'state/forms/selectors';

jest.unmock('state/forms/selectors');

describe('state/forms/selectors', () => {
  it('getPageForm should get the "page" form data', () => {
    const result = getPageForm({});
    expect(result.form).toBe('page');
  });

  it('getPageModelForm should get the "pageModel" form data', () => {
    const result = getPageModelForm({});
    expect(result.form).toBe('pageModel');
  });
});
