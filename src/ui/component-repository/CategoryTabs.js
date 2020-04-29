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
      componentRepositoryCategories,
      selectedECRCategory,
      onSelect,
      intl,
    } = this.props;
    const formatText = id => intl.formatMessage({ id });

    const categories = componentRepositoryCategories.map(category => (
      { label: formatText(`componentRepository.categories.${category}`, category), value: category }
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

    const index = categories.indexOf(selectedECRCategory);
    const selectedECRCategoryIndex = index !== -1 ? index : 0;

    return (
      <div className="CategoryTabs">
        <Tabs
          id="ecr-category-tabs"
          justified
          defaultActiveKey={selectedECRCategoryIndex}
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
  componentRepositoryCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedECRCategory: PropTypes.string.isRequired,
  onWillMount: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default injectIntl(CategoryTabs);
