// eslint-disable-next-line import/prefer-default-export
export const getUserProfile = state => state.userProfile;
export const getUserEmail = (state) => {
  const { attributes } = state.userProfile;
  const emailAttribute = attributes.find(attr => attr.code === 'email');
  return emailAttribute && emailAttribute.value;
};
