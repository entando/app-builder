import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {
  field = ({ input, meta, options }) => {
    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({ label, value }, index) => {
      const handleChange = (event) => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      return (
        <li key={`checkbox-${value}`}>
          <input id={`checkbox-${value}`} type="checkbox" name={`${name}[${index}]`} value={value} checked={checked} onChange={handleChange} />
          <label htmlFor={`checkbox-${value}`}>
            <span>{label}</span>
          </label>
        </li>
      );
    });

    return (
      <div className="CheckboxGroup">
        <ul>
          {checkboxes}
        </ul>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};
