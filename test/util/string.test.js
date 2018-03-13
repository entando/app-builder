import { isEmpty } from 'util/string';

describe('String.isEmpty', () => {
  it('does not validate booleans', () => {
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });

  it('does validate null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('does validate empty strings', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('   ')).toBe(true);
  });

  it('does not validate numbers', () => {
    expect(isEmpty(2.2)).toBe(false);
    expect(isEmpty(2)).toBe(false);
    expect(isEmpty(-2)).toBe(false);
  });

  it('does validate undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('does not validate not empty strings', () => {
    expect(isEmpty('2.2')).toBe(false);
    expect(isEmpty('test ')).toBe(false);
  });
});
