import 'test/enzyme-init';
import {
  required,
  maxLength,
  minLength,
  isNumber,
  minValue,
  maxValue,
  email,
  alphaNumeric,
  widgetCode,
} from 'util/validateForm';


jest.mock('react-intl', () => ({ FormattedMessage: 'Error', addLocaleData: () => jest.fn() }));

describe('util/validateForm', () => {
  let foo;

  describe('verify required function', () => {
    it('pass', () => {
      foo = required('test');
      expect(foo).toBeUndefined();
    });
    it('fail', () => {
      foo = required(null);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.required');
    });
  });
  describe('verify maxLength function', () => {
    it('fail', () => {
      foo = maxLength(3)('abcde');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.maxLength');
    });
    it('pass', () => {
      foo = maxLength(3)('abc');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify minLength function', () => {
    it('fail', () => {
      foo = minLength(3)('ab');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.minLength');
    });
    it('pass', () => {
      foo = minLength(3)('abcde');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify isNumber function', () => {
    it('fail', () => {
      foo = isNumber('a');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.number');
    });
    it('pass', () => {
      foo = isNumber(1);
      expect(foo).toBeUndefined();
    });
  });

  describe('verify minValue function', () => {
    it('fail', () => {
      foo = minValue(10)(5);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.minValue');
    });
    it('pass', () => {
      foo = minValue(3)(10);
      expect(foo).toBeUndefined();
    });
  });
  describe('verify maxValue function', () => {
    it('fail', () => {
      foo = maxValue(10)(15);
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.maxValue');
    });
    it('pass', () => {
      foo = maxValue(10)(5);
      expect(foo).toBeUndefined();
    });
  });
  describe('verify email function', () => {
    it('fail', () => {
      foo = email('test.entando.com');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.email');
    });
    it('pass', () => {
      foo = email('test@entando.com');
      expect(foo).toBeUndefined();
    });
  });

  describe('verify alphaNumeric function', () => {
    it('fail', () => {
      foo = alphaNumeric('a');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.alphaNumeric');
    });
    it('pass', () => {
      foo = alphaNumeric('a.');
      expect(foo).toBeUndefined();
    });
  });
  describe('verify widgetCode function', () => {
    it('fail', () => {
      foo = widgetCode('code.');
      expect(foo).toHaveProperty('type', 'Error');
      expect(foo).toHaveProperty('props.id', 'validateForm.widgetCode');
    });
    it('pass', () => {
      foo = widgetCode('code_');
      expect(foo).toBeUndefined();
    });
  });
});
