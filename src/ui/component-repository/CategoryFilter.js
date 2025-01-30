import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form';
import { DropdownButton } from 'patternfly-react';
import CheckboxGroup from 'ui/component-repository/common/CheckboxGroup';

const CategoryFilterBody = ({
  componentRepositoryCategories, intl, onChange, showCategoryFilter,
}) => (
  showCategoryFilter ?
    <DropdownButton
      title={intl.formatMessage({ id: 'componentRepository.sidebar.categoryFilterTitle' })}
      multiple
      className="CategoryFilter__dropdown-btn"
    >
      <CheckboxGroup
        name="categories"
        options={componentRepositoryCategories}
        onChange={onChange}
      />
    </DropdownButton>
    : <React.Fragment />);
CategoryFilterBody.propTypes = {
  intl: intlShape.isRequired,
  componentRepositoryCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'categoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(CategoryFilterBody));
