import { isInteger } from 'util/numeric';

describe('Numeric.isInteger', () => {
  it('does not validate booleans', () => {
    expect(isInteger(false)).toBe(false);
    expect(isInteger(true)).toBe(false);
  });

  it('does not validate null', () => {
    expect(isInteger(null)).toBe(false);
  });

  it('does not validate strings', () => {
    expect(isInteger('')).toBe(false);
    expect(isInteger('null')).toBe(false);
  });

  it('does not validate floats', () => {
    expect(isInteger(2.2)).toBe(false);
    expect(isInteger('2.2')).toBe(false);
  });

  it('does validate integers', () => {
    expect(isInteger(2)).toBe(true);
    expect(isInteger('2')).toBe(true);
  });

  it('does validate negative integers', () => {
    expect(isInteger(-2)).toBe(true);
    expect(isInteger('-2')).toBe(true);
  });
});
