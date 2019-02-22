import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Tabs, Tab } from 'patternfly-react';

class CategoryTabs extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      digitalExchangeCategories,
      selectedDECategory,
      onSelect,
      intl,
    } = this.props;
    const formatText = id => intl.formatMessage({ id });

    const categories = digitalExchangeCategories.map(category => (
      { label: formatText(`digitalExchange.categories.${category}`, category), value: category }
    ));

    const handleSelect = (key) => {
      onSelect(categories[key].value);
    };

    const tabs = categories.map((category, index) => (
      <Tab
        key={category.value}
        eventKey={index}
        title={category.label}
      />
    ));

    const index = categories.indexOf(selectedDECategory);
    const selectedDECategoryIndex = index !== -1 ? index : 0;

    return (
      <div className="CategoryTabs">
        <Tabs
          id="de-category-tabs"
          justified
          defaultActiveKey={selectedDECategoryIndex}
          onSelect={key => handleSelect(key)}
        >
          { tabs }
        </Tabs>
      </div>
    );
  }
}

CategoryTabs.propTypes = {
  intl: intlShape.isRequired,
  digitalExchangeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDECategory: PropTypes.string.isRequired,
  onWillMount: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default injectIntl(CategoryTabs);
