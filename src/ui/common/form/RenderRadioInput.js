import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


const RenderRadioInput = ({ input, toggleElement }) =>
  (
    <ToggleButtonGroup
      type="radio"
      {...input}
    >
      { toggleElement.map(item => (
        <ToggleButton
          key={item.id}
          value={item.id}
          defaultValue={input.value}
        >
          {item.label}
        </ToggleButton>
      ))
      }
    </ToggleButtonGroup>
  );

RenderRadioInput.propTypes = {
  toggleElement: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  input: PropTypes.shape({}).isRequired,
};
RenderRadioInput.defaultProps = {
  toggleElement: [{
    id: '',
    label: '',
  }],
};

export default RenderRadioInput;
