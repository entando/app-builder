import localeEn from 'locales/en';
import localeIt from 'locales/it';

describe('locales/en', () => {
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
