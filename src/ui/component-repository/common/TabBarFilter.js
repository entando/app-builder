import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class TabBarFilter extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      filterTabs, selectedFilterTab, onSelect, attributes,
    } = this.props;


    const handleSelect = (value) => {
      onSelect(value);
    };

    const buttons = filterTabs.map(filterTab => (
      <Button
        key={filterTab.value}
        // eventKey={index}
        onClick={() => { handleSelect(filterTab.value); }}
        className={filterTab.value === selectedFilterTab && 'active'}
      >
        {filterTab.label}
      </Button>
    ));

    return (
      <div className="TabBarFilter">
        <div>
          <FormattedMessage id="componentRepository.filterTabs.filterBy" />{':'}
        </div>
        <ButtonGroup
          id={attributes.componentId}
          justified
        >
          { buttons }
        </ButtonGroup>
      </div>
    );
  }
}

TabBarFilter.propTypes = {
  filterTabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  selectedFilterTab: PropTypes.string.isRequired,
  onWillMount: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  attributes: PropTypes.shape({
    componentClass: PropTypes.string,
    componentId: PropTypes.string,
  }).isRequired,
};

TabBarFilter.defaultProps = {
  onWillMount: () => {},
};

export default TabBarFilter;
