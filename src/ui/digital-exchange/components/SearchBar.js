import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { throttle } from '@entando/utils';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      filled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      filled: (e.target.value !== ''),
    });
  }

  handleClear() {
    const triggerSubmit = this.state.value !== '';
    this.setState({
      value: '',
      filled: false,
    });
    if (triggerSubmit) {
      throttle(() => this.handleSubmit());
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) this.handleSubmit();
  }

  handleSubmit() {
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <div className="SearchBar__container">
        <div className="SearchBar__textbox">
          <input
            type="text"
            className="SearchBar__textbox--base"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onKeyUp={this.handleKeyUp}
            placeholder="Search"
            value={this.state.value}
          />
          {this.state.filled ? (
            <Button className="btn-transparent SearchBar__button-close" onClick={this.handleClear}>
              <Icon name="close" />
            </Button>
          ) : null}
        </div>
        <Button
          className="SearchBar__button"
          onClick={this.handleSubmit}
        >
          <Icon name="search" />
        </Button>
      </div>
    );
  }
}


SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


export default SearchBar;
