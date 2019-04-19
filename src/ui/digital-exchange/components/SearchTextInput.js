import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';

const SearchTextInput = ({
  input,
  meta,
  onClear,
  ...others
}) => (
  <div className="SearchBar__textbox">
    <input
      {...input}
      id={input.name}
      type="text"
      className="SearchBar__textbox--base"
      placeholder="Search"
      {...others}
    />
    {input.value ? (
      <Button
        className="btn-transparent SearchBar__button-close"
        onClick={onClear}
      >
        <Icon name="close" />
      </Button>
    ) : null}
  </div>
);

SearchTextInput.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  onClear: PropTypes.func,
};

SearchTextInput.defaultProps = {
  input: {},
  meta: {},
  onClear: () => {},
};

export default SearchTextInput;
