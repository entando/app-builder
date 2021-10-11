import React from 'react';
import PropTypes from 'prop-types';

const MultiSelectMenuItem = ({
  name, code, active, onItemClicked, i,
}) => (
  <div
    className={`MultiSelectMenuItem ${active ? 'MultiSelectMenuItem--active' : ''}`}
    onClick={() => onItemClicked(code)}
    onKeyDown={() => onItemClicked(code)}
    role="button"
    tabIndex={i}
  >
    <span
      className={`glyphicon glyphicon-ok check-mark MultiSelectMenuItem__check ${active ? 'MultiSelectMenuItem__check--active' : ''}`}
    />
    <span className="MultiSelectMenuItem__text">
      {name}
    </span>
  </div>
);

MultiSelectMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onItemClicked: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};

MultiSelectMenuItem.defaultProps = {
  active: false,
};

export default MultiSelectMenuItem;
