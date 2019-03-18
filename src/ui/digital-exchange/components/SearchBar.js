import React from 'react';
import PropTypes from 'prop-types';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <button onClick={this.handleSubmit}> Search </button>
      </div >);
  }
}


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default SearchBar;
