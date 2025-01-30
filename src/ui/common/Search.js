import React from 'react';
import Icon from './icon/Icon';

// eslint-disable-next-line react/prop-types
const Search = ({ input, reverse, ...rest }) => (
  <div className={`Search ${reverse && 'reverse'}`}>
    <input {...input} {...rest} />
    <Icon name="search" />
  </div>
);

export default Search;
