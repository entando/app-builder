import React from 'react';
import PropTypes from 'prop-types';

const ComponentImage = ({ component }) => {
  if (component.thumbnail) {
    return (
      <img
        alt={component.title}
        src={component.thumbnail}
        style={{ width: '100%', objectFit: 'contain' }}
      />);
  }

  return (
    <img src="images/image-unavailable.png" alt="unavailable" />
  );
};

ComponentImage.propTypes = {
  component: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ComponentImage;
