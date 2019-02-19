import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';

class TabBarFilter extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      filterTabs, selectedFilterTab, onSelect, attributes,
    } = this.props;


    const handleSelect = (key) => {
      onSelect(filterTabs[key].value);
    };

    const tabs = filterTabs.map((filterTab, index) => (
      <Tab
        key={filterTab.value}
        eventKey={index}
        title={filterTab.label}
      />
    ));

    const index = filterTabs.indexOf(selectedFilterTab);
    const selectedFilterTabIndex = index !== -1 ? index : 0;

    return (
      <div className={`TabBarFilter ${attributes.componentClass}`}>
        <Tabs
          id={attributes.componentId}
          justified
          defaultActiveKey={selectedFilterTabIndex}
          onSelect={key => handleSelect(key)}
        >
          { tabs }
        </Tabs>
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
  onWillMount: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  attributes: PropTypes.shape({
    componentClass: PropTypes.string,
    componentId: PropTypes.string,
  }).isRequired,
};

export default TabBarFilter;
