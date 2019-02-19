import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

class CategoryFilterBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { digitalExchangeCategories, intl } = this.props;
    const formatText = id => intl.formatMessage({ id });
    const options = digitalExchangeCategories.map(category => ({
      label: formatText(`digitalExchange.categories.${category}`),
      value: category,
    }));

    return (
      <SidebarFilter title={formatText('digitalExchange.sidebar.categoryFilterTitle')}>
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
  digitalExchangeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'categoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(CategoryFilterBody));
