export const KEY_ENTER = 13;
export const KEY_SPACE = 32;
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;

export const CONFIRM_KEYS = [KEY_ENTER, KEY_SPACE];
export const HORIZONTAL_ARROW_KEYS = [KEY_LEFT, KEY_RIGHT];

export const eventToConfirm = ({ type, keyCode }) => {
  const clickConfirmed = type === 'click';
  const keyConfirmed = type === 'keydown' && CONFIRM_KEYS.includes(keyCode);
  return {
    clickConfirmed,
    keyConfirmed,
  };
};
