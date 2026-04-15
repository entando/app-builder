import { getFeatureFlags, hasFeatureFlag, FEATURE_FLAG_HEADLESS_WIDGET_CONFIG } from 'helpers/featureFlags';

describe('helpers/featureFlags', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getFeatureFlags', () => {
    it('returns empty array when env var is not set', () => {
      delete process.env.ENTANDO_FEATURE_FLAGS;
      expect(getFeatureFlags()).toEqual([]);
    });

    it('returns empty array when env var is empty', () => {
      process.env.ENTANDO_FEATURE_FLAGS = '';
      expect(getFeatureFlags()).toEqual([]);
    });

    it('parses a single flag', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'HEADLESS_WIDGET_CONFIG';
      expect(getFeatureFlags()).toEqual(['HEADLESS_WIDGET_CONFIG']);
    });

    it('parses multiple comma-separated flags', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'HEADLESS_WIDGET_CONFIG,OTHER_FLAG,THIRD';
      expect(getFeatureFlags()).toEqual(['HEADLESS_WIDGET_CONFIG', 'OTHER_FLAG', 'THIRD']);
    });

    it('trims whitespace around flags', () => {
      process.env.ENTANDO_FEATURE_FLAGS = ' HEADLESS_WIDGET_CONFIG , OTHER_FLAG ';
      expect(getFeatureFlags()).toEqual(['HEADLESS_WIDGET_CONFIG', 'OTHER_FLAG']);
    });

    it('ignores empty segments from trailing commas', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'FLAG_A,,FLAG_B,';
      expect(getFeatureFlags()).toEqual(['FLAG_A', 'FLAG_B']);
    });
  });

  describe('hasFeatureFlag', () => {
    it('returns true when the flag is present', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'HEADLESS_WIDGET_CONFIG';
      expect(hasFeatureFlag(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG)).toBe(true);
    });

    it('returns false when the flag is not present', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'OTHER_FLAG';
      expect(hasFeatureFlag(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG)).toBe(false);
    });

    it('returns false when no flags are set', () => {
      delete process.env.ENTANDO_FEATURE_FLAGS;
      expect(hasFeatureFlag(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG)).toBe(false);
    });

    it('works with multiple flags', () => {
      process.env.ENTANDO_FEATURE_FLAGS = 'FOO,HEADLESS_WIDGET_CONFIG,BAR';
      expect(hasFeatureFlag(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG)).toBe(true);
      expect(hasFeatureFlag('FOO')).toBe(true);
      expect(hasFeatureFlag('UNKNOWN')).toBe(false);
    });
  });

  describe('FEATURE_FLAG_HEADLESS_WIDGET_CONFIG', () => {
    it('has the expected value', () => {
      expect(FEATURE_FLAG_HEADLESS_WIDGET_CONFIG).toBe('HEADLESS_WIDGET_CONFIG');
    });
  });
});