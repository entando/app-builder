import { compareSemanticVersions } from 'helpers/comparisons';

const RAW_VERSIONS = [
  'v1.0.0',
  'v1.0.1',
  'v1.0.2',
  'v1.0.3',
  'v1.0.4',
  'v2.0.0',
  'v2.0.2',
  'v2.0.1',
  'v1.7.9',
  'v0.0.1',
];

const DESC_RAW_VERSIONS = [
  'v2.0.2',
  'v2.0.1',
  'v2.0.0',
  'v1.7.9',
  'v1.0.4',
  'v1.0.3',
  'v1.0.2',
  'v1.0.1',
  'v1.0.0',
  'v0.0.1',
];

describe('test compareSemanticVersions', () => {
  it('should sort the array versions descending', () => {
    expect(RAW_VERSIONS.sort((a, b) => compareSemanticVersions(b, a))).toEqual(DESC_RAW_VERSIONS);
  });
  it('should sort the array versions ascending', () => {
    expect(RAW_VERSIONS.sort((a, b) => compareSemanticVersions(a, b)))
      .toEqual(DESC_RAW_VERSIONS.reverse());
  });
});
