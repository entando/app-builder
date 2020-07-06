import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const componentType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  version: PropTypes.string,
  versions: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number.isRequired,
});
