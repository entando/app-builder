// eslint-disable-next-line
export const swapItems = (attributes, attrIndex, isMovableUp) => {
  const attributesArray = [...attributes];
  let swapIndex;
  if (isMovableUp) {
    swapIndex = attrIndex > 0 ? attrIndex - 1 : 0;
  } else {
    swapIndex = attrIndex < attributesArray.length - 1 ?
      attrIndex + 1 : attributesArray.length - 1;
  }
  const temp = attributes[attrIndex];
  attributesArray[attrIndex] = attributes[swapIndex];
  attributesArray[swapIndex] = temp;

  return attributesArray;
};
