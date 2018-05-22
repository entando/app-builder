// eslint-disable-next-line import/prefer-default-export
export const LANGUAGES_LIST = [
  {
    code: 'it',
    description: 'Italiano',
    name: 'Italiano',
    isActive: true,
    isDefault: false,
  },
  {
    code: 'en',
    description: 'English',
    name: 'English',
    isActive: true,
    isDefault: true,
  },
  {
    code: 'nl',
    description: 'Dutch',
    name: 'Dutch',
    isActive: false,
    isDefault: false,
  },
];

export const LANGUAGES_NORMALIZED = {
  list: ['it', 'en', 'nl'],
  map: {
    it: {
      code: 'it',
      description: 'Italiano',
      isActive: true,
      isDefault: false,
    },
    en: {
      code: 'en',
      description: 'English',
      isActive: true,
      isDefault: true,
    },
    nl: {
      code: 'nl',
      description: 'Dutch',
      isActive: false,
      isDefault: false,
    },
  },
};
