import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

const CategoryFilterBody = ({ digitalExchangeCategories, intl, onChange }) => (
  <SidebarFilter
    title={intl.formatMessage({ id: 'digitalExchange.sidebar.categoryFilterTitle' })}
  >
    <CheckboxGroup
      name="categories"
      options={digitalExchangeCategories}
      onChange={onChange}
    />
  </SidebarFilter>
);

CategoryFilterBody.propTypes = {
  intl: intlShape.isRequired,
  digitalExchangeCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'categoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(CategoryFilterBody));
