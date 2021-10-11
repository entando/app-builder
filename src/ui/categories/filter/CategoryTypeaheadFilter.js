import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';

const CategoryTypeaheadFilter = ({
  categories,
  filteredCategories,
  language,
  onChangeCategory,
  intl,
  paginationOptions,
  onApplyFilteredSearch,
  filterSubject,
  applyFilterParams,
  noLabel,
  onDidMount,
}) => {
  useEffect(() => {
    onDidMount();
  }, []);
  const onChange = (category) => {
    const selected = category.map(catId => (
      categories.find(cat => cat.code === catId)
    ));
    onChangeCategory(selected, filterSubject);
    if (onApplyFilteredSearch) {
      const { perPage: pageSize } = paginationOptions;
      const filterParams = [];
      if (selected.length) {
        filterParams.push(selected.map((filter, i) => (
          `filters[${i}].attribute=categories&filters[${i}].value=${filter.code}`
        )).join(''));
      }

      const extraParams = new URLSearchParams({
        page: 1,
        pageSize,
        ...(applyFilterParams || {}),
      });
      filterParams.push(extraParams.toString());

      onApplyFilteredSearch(selected, `?${filterParams.join('&')}`);
    }
  };
  const categoryOptions = categories
    .filter(c => c.code !== 'home')
    .map(cat => ({ ...cat, name: cat.titles[language] }));
  return (
    <RenderDropdownTypeaheadInput
      input={{ name: 'categories', value: filteredCategories.map(({ code }) => code), onChange }}
      label={<FormLabel labelId="cms.contents.edit.categories" />}
      inputSize={noLabel ? 12 : 9}
      labelSize={noLabel ? 0 : 2}
      options={categoryOptions}
      alignClass="text-right"
      labelKey="name"
      valueKey="code"
      multiple
      placeholder={intl.formatMessage({ id: 'cms.contents.selectCategories' })}
    />
  );
};

CategoryTypeaheadFilter.propTypes = {
  intl: intlShape.isRequired,
  filteredCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChangeCategory: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  language: PropTypes.string.isRequired,
  filterSubject: PropTypes.string.isRequired,
  paginationOptions: PropTypes.shape({
    perPage: PropTypes.number,
  }).isRequired,
  onApplyFilteredSearch: PropTypes.func,
  applyFilterParams: PropTypes.shape({}),
  noLabel: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
};

CategoryTypeaheadFilter.defaultProps = {
  onChangeCategory: () => {},
  onApplyFilteredSearch: null,
  applyFilterParams: null,
  noLabel: false,
};

export default CategoryTypeaheadFilter;
