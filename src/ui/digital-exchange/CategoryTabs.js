import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';
import { formattedText } from '@entando/utils';

class CategoryTabs extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { digitalExchangeCategories, onSelect } = this.props;

    const categories = [
      { label: formattedText('digitalExchange.categoryTabs.all'), value: null },
      ...digitalExchangeCategories.map(category => (
        { label: category, value: category }
      )),
    ];

    const handleSelect = (key) => {
      onSelect(categories[key].value);
    };

    return (
      <div className="CategoryTabs">
        <Tabs
          id="de-category-tabs"
          justified
          defaultActiveKey={0}
          onSelect={key => handleSelect(key)}
        >
          {
            categories.map((category, index) => (
              <Tab
                key={category.label}
                eventKey={index}
                title={category.label}
              />
            ))
          }
        </Tabs>
      </div>
    );
  }
}

CategoryTabs.propTypes = {
  digitalExchangeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryTabs;
