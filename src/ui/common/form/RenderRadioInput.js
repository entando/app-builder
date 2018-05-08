import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';

const RenderRadioInput = ({ input, toggleElement, defaultValue }) =>
  (
    <ButtonToolbar className="RenderRadioInput">
      <ToggleButtonGroup
        type="radio"
        {...input}
        value={input.value ? input.value : defaultValue}
      >
        { toggleElement.map(item => (
          <ToggleButton
            key={item.id}
            value={item.id}
            className="RenderRadioInput__toggle-btn"
          >
            {item.label}
          </ToggleButton>
      ))
      }
      </ToggleButtonGroup>
    </ButtonToolbar>
  );

RenderRadioInput.propTypes = {
  toggleElement: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  input: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
RenderRadioInput.defaultProps = {
  toggleElement: [{
    id: '',
    label: '',
  }],
  defaultValue: '',
};

export default RenderRadioInput;
