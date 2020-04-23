import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/component-repository/common/CheckboxGroup';
import SidebarFilter from 'ui/component-repository/common/SidebarFilter';

const CategoryFilterBody = ({ componentRepositoryCategories, intl, onChange }) => (
  <SidebarFilter
    title={intl.formatMessage({ id: 'digitalExchange.sidebar.categoryFilterTitle' })}
  >
    <CheckboxGroup
      name="categories"
      options={componentRepositoryCategories}
      onChange={onChange}
    />
  </SidebarFilter>
);

CategoryFilterBody.propTypes = {
  intl: intlShape.isRequired,
  componentRepositoryCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'categoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(CategoryFilterBody));
