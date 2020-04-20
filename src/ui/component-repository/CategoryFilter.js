import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/component-repository/common/CheckboxGroup';
import SidebarFilter from 'ui/component-repository/common/SidebarFilter';

class CategoryFilterBody extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const { componentRepositoryCategories, intl } = this.props;
    const formatText = id => intl.formatMessage({ id });
    const options = componentRepositoryCategories.map(category => ({
      label: formatText(`componentRepository.categories.${category}`),
      value: category,
    }));

    return (
      <SidebarFilter
        title={formatText('componentRepository.sidebar.categoryFilterTitle')}
      >
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
  intl: intlShape.isRequired,
  componentRepositoryCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDidMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'categoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(CategoryFilterBody));
