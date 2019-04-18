import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';

const SearchTextInput = ({
  input,
  filled,
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
    {filled ? (
      <Button
        className="btn-transparent SearchBar__button-close"
        onClick={() => {
          const triggerClear = input.value !== '';
          input.onChange('');
          if (triggerClear) {
            setTimeout(onClear, 10);
          }
        }}
      >
        <Icon name="close" />
      </Button>
    ) : null}
  </div>
);

SearchTextInput.propTypes = {
  input: PropTypes.shape({}),
  filled: PropTypes.bool.isRequired,
  meta: PropTypes.shape({}),
  onClear: PropTypes.func,
};

SearchTextInput.defaultProps = {
  input: {},
  meta: {},
  onClear: () => {},
};

export default SearchTextInput;
