import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';

class WidgetListActionToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    alert('open dropdown gianni');
    this.props.onClick(e);
  }

  render() {
    return (
      <Button className="WidgetListActionToggle" bsStyle="link" onClick={this.handleClick}>
        <i className="fa fa-ellipsis-v" />
      </Button>
    );
  }
}

WidgetListActionToggle.propTypes = {
  onClick: PropTypes.func,
};
WidgetListActionToggle.defaultProps = {
  onClick: () => {},
};

export default WidgetListActionToggle;
