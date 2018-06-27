import { formattedText } from '@entando/utils';

export const PROFILE_FILTER_OPTIONS = [
  {
    id: 'all',
    label: formattedText('user.profile.all'),
  },
  {
    id: 'with',
    label: formattedText('user.profile.with'),
  },
  {
    id: 'without',
    label: formattedText('user.profile.without'),
  },
];
export const BOOLEAN_OPTIONS = [
  {
    id: 'true',
    label: formattedText('app.booleanOptions.true'),
  },
  {
    id: 'false',
    label: formattedText('app.booleanOptions.false'),
  },
];

export const THREE_STATE_OPTIONS = [
  {
    id: 'true',
    label: formattedText('app.threeStateOptions.true'),
  },
  {
    id: 'false',
    label: formattedText('app.threeStateOptions.false'),
  },
  {
    id: '',
    label: formattedText('app.threeStateOptions.both'),
  },
];

export const PROFILE_FILTER_VALUE_MAP = {
  all: null,
  without: 0,
  with: 1,
};
