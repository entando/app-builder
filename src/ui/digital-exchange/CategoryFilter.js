import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

class CategoryFilterBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const options = this.props.digitalExchangeCategories.map(category => (
      { label: category, value: category }
    ));

    return (
      <SidebarFilter title="Categories">
        <CheckboxGroup
          name="categories"
          options={options}
          onChange={this.props.onChange}
        />
      </SidebarFilter>
    );
  }
}

CategoryFilterBody.propTypes = {
  digitalExchangeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CategoryFilter = reduxForm({
  form: 'categoryFilter',
})(CategoryFilterBody);

export default CategoryFilter;
