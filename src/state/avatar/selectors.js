import { createSelector } from 'reselect';

export const getAvatar = state => state.avatar;

export const getAvatarFilename = createSelector(
  getAvatar,
  avatar => avatar.filename,
);

export const getUseGravatar = createSelector(
  getAvatar,
  avatar => avatar.useGravatar,
);

