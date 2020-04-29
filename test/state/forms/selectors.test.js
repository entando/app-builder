
import { getPageForm, getPageTemplateForm } from 'state/forms/selectors';

jest.unmock('state/forms/selectors');

describe('state/forms/selectors', () => {
  it('getPageForm should get the "page" form data', () => {
    const result = getPageForm({});
    expect(result.form).toBe('page');
  });

  it('getPageTemplateForm should get the "pageTemplate" form data', () => {
    const result = getPageTemplateForm({});
    expect(result.form).toBe('pageTemplate');
  });
});
