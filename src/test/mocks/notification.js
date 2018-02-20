// eslinter-disable-next-line
export const NOTIFICATION = {
  payload: {
    notifications: [
      {
        id: 3,
        author: {
          username: 'Admin',
          fullName: 'Gianni Moi',
        },
        notification: {
          it: 'ha creato una pagina',
          en: 'created a page',
        },
        targetType: 'content',
        target: {
          name: 'Page',
          pageCode: 'psdf',
          frame: 0,
        },
        modificationDate: '2017-08-02 12:02:34',
        like: 0,
      },

      {
        id: 2,
        author: {
          username: 'Paco',
          fullName: 'Pasquale Addeo',
        },
        notification: {
          it: 'ha modificato una pagina',
          en: 'modified a page',
        },
        targetType: 'widget',
        target: {
          id: 'widgetId',
          name: 'Login Widget',
          pageCode: '',
          frame: 1,
        },
        modificationDate: '2017-08-02 12:02:34',
        like: 0,
      },

      {
        id: 1,
        author: {
          username: 'Lorentz',
          fullName: 'Franco Locci',
        },
        notification: {
          it: 'ha creato un widget',
          en: 'created a widgt',
        },
        targetType: 'page',
        target: {
          name: 'Login Widget',
          pageCode: 'testdsf',
        },
        modificationDate: '2017-08-02 12:02:34',
        like: 0,
      },
    ],
  },
};
export default NOTIFICATION;
