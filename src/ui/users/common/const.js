export const PROFILE_FILTER_OPTIONS = [
  {
    id: 'all',
    label: 'user.profile.all',
  },
  {
    id: 'with',
    label: 'user.profile.with',
  },
  {
    id: 'without',
    label: 'user.profile.without',
  },
];
export const BOOLEAN_OPTIONS = [
  {
    id: 'true',
    label: 'app.booleanOptions.true',
  },
  {
    id: 'false',
    label: 'app.booleanOptions.false',
  },
];

export const THREE_STATE_OPTIONS = [
  {
    id: 'true',
    label: 'app.threeStateOptions.true',
  },
  {
    id: 'false',
    label: 'app.threeStateOptions.false',
  },
  {
    id: '',
    label: 'app.threeStateOptions.both',
  },
];

export const PROFILE_FILTER_VALUE_MAP = {
  all: null,
  without: 0,
  with: 1,
};

export const getTranslatedOptions = (intl, arr) => arr.map(item => ({
  id: item.id,
  label: intl.formatMessage({ id: item.label }),
}));
