import React from 'react';

import { componentType } from 'models/component-repository/components';


const ComponentImage = ({ component }) => {
  if (component.thumbnail) {
    return (
      <img
        alt={component.title}
        src={component.thumbnail}
      />);
  }

  return (
    <img src="images/image-unavailable.png" alt="" />
  );
};

ComponentImage.propTypes = {
  component: componentType.isRequired,
};


export default ComponentImage;
