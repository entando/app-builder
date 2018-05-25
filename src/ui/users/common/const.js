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

export const PROFILE_FILTER_VALUE_MAP = {
  all: null,
  without: 0,
  with: 1,
};
