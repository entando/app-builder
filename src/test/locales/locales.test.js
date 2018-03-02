import localeEn from 'locales/en';
import localeIt from 'locales/it';

describe('test locales objects structure', () => {
  it('verify presence of EN locale', () => {
    expect(localeEn.locale).toBe('en');
  });
  it('verify presence of IT locale', () => {
    expect(localeIt.locale).toBe('it');
  });
  it('verify presence of message property', () => {
    expect(localeIt.messages).toBeDefined();
    expect(localeEn.messages).toBeDefined();
  });
});

describe('coherence test between locales files', () => {
  const itKeys = Object.keys(localeIt.messages);
  const enKeys = Object.keys(localeIt.messages);
  it('same number of keys in locales files', () => {
    expect(itKeys.length).toEqual(enKeys.length);
  });
  it('same key values in each file', () => {
    expect(itKeys).toEqual(enKeys);
  });
});
