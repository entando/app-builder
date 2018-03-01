import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageTreeActionMenuButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.onClick) this.props.onClick(e);
  }

  render() {
    return (
      <i
        className="PageTreeActionMenuButton fa fa-ellipsis-v"
        role="button"
        tabIndex="-1"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
      />
    );
  }
}

PageTreeActionMenuButton.propTypes = {
  onClick: PropTypes.func,
};

PageTreeActionMenuButton.defaultProps = {
  onClick: null,
};

export default PageTreeActionMenuButton;
