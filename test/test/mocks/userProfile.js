// eslint-disable-next-line import/prefer-default-export
export const USER_PROFILE = {
  id: 'editor',
  typeCode: 'AAA',
  typeDescription: 'User profile',
  attributes: [{
    code: 'fullname',
    value: 'user1',
  }, {
    code: 'email',
    value: 'user1@entando.com',
  }, {
    code: 'boolean',
    value: false,
  }, {
    code: 'number',
    value: 6,
  }, {
    code: 'monolist',
    elements: [
      {
        code: 'Sottotitolo',
        values: {
          it: 'multilingua IT',
          en: 'multilingual EN',
        },
      }, {
        code: 'Titolo',
        value: 'Mio titolo',
      },
    ],
  }, {
    code: 'data',
    value: '2017-09-21 21:24:18',
  }, {
    code: 'multilist',
    listelements: {
      it: [
        {
          code: 'multilist',
          value: 'value_it_1',
        }, {
          code: 'multilist',
          value: 'value_it_2',
        },
      ],
      en: [
        {
          code: 'multilist',
          value: 'value_en_1',
        }, {
          code: 'multilist',
          value: 'value_en_2',
        },
      ],
    },
  }, {
    code: 'composite',
    compositeelements: [
      {
        code: 'Sottotitolo',
        values: {
          it: 'multilingua IT',
          en: 'multilingual EN',
        },
      }, {
        code: 'Titolo',
        value: 'Mio titolo',
      },
    ],
  },
  ],
};

export const USER_PROFILE_PICTURE = {
  username: 'admin',
  versions: [
    {
      dimensions: null,
      path: '/entando-de-app/engine/admin/profile/image_d0.jpg',
      size: '2 Kb',
    },
    {
      dimensions: '90x90 px',
      path: '/entando-de-app/engine/admin/profile/image_d1.jpg',
      size: '2 Kb',
    },
    {
      dimensions: '130x130 px',
      path: '/entando-de-app/engine/admin/profile/image_d2.jpg',
      size: '2 Kb',
    },
    {
      dimensions: '150x150 px',
      path: '/entando-de-app/engine/admin/profile/image_d3.jpg',
      size: '2 Kb',
    },
  ],
};
