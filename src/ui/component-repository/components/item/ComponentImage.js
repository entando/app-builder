import React from 'react';
import PropTypes from 'prop-types';

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
  component: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ComponentImage;
