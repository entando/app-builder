import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';

class ComponentList extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderComponentList() {
    return (
      this.props.components.map(component => (
        <div key={component.id}>
          <h2>{component.name}</h2>
          <ul>
            <li> marketplace: {component.marketplace} </li>
            <li> rating: {component.rating} </li>
            <li> category: {component.type} </li>
          </ul>
        </div>
      ))
    );
  }

  render() {
    return (
      <div className="ComponentList">
        <Spinner loading={!!this.props.loading} >
          {this.renderComponentList()}
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  components: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastUpdate: PropTypes.string.isRequired,
    marketplace: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number.isRequired,
  })),
};

ComponentList.defaultProps = {
  onWillMount: () => {},
  loading: false,
  components: [],
};

export default ComponentList;
