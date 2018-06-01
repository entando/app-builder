export const COMMENT = {
  username: 'admin',
  displayName: 'admin',
  id: 23,
  commentDate: '2018-05-11 07:27:34',
  commentText: 'well done!',
};

export const NEW_COMMENT = {
  username: 'admin',
  displayName: 'admin',
  id: 33,
  commentDate: '2018-05-15 07:27:34',
  commentText: 'new comment',
};

export const NOTIFICATIONS = [{
  id: 1,
  createdAt: '2013-09-27 08:58:38',
  updatedAt: '2018-05-11 07:28:17',
  username: 'admin',
  namespace: '/entando-sample/api/pages/',
  actionName: 'save',
  parameters: {
    pageCode: 'page',
  },
  likes: [{
    username: 'admin',
    displayName: 'admin',
  }],
  comments: [COMMENT],
}];
export default NOTIFICATIONS;
