import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const HomePageLink = ({ link }) => (
  <li className="HomePageLink">
    <a className="HomePageLink__link" href={link} target="_blank" rel="noopener noreferrer">
      <Icon name="home" className="HomePageLink__icon" />
    </a>
  </li>
);

HomePageLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default HomePageLink;
