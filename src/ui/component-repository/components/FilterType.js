import React from 'react';
import PropTypes from 'prop-types';
import { Filter } from 'patternfly-react';
import { injectIntl, intlShape } from 'react-intl';

const translateFilter = (intl, filter) => ({
  ...filter,
  title: intl.formatMessage({ id: `app.filterTypesSelect.${filter.id}` }),
});

const translateTitles = (intl, filters) =>
  filters.map(filter => translateFilter(intl, filter));

const FilterType = ({
  filterTypes, className, currentFilterType, onFilterTypeSelected, intl,
}) => (
  <Filter.TypeSelector
    className={`FilterType ${className}`}
    filterTypes={translateTitles(intl, filterTypes)}
    currentFilterType={translateFilter(intl, currentFilterType)}
    onFilterTypeSelected={onFilterTypeSelected}
  />
);

FilterType.propTypes = {
  intl: intlShape.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onFilterTypeSelected: PropTypes.func,
  currentFilterType: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    filterType: PropTypes.string,
  }).isRequired,
};

FilterType.defaultProps = {
  filterTypes: [
    {
      id: 'name',
      title: 'Name',
      filterType: 'text',
    },
    {
      id: 'description',
      title: 'Description',
      filterType: 'text',
    },
    {
      id: 'version',
      title: 'Version',
      filterType: 'text',
    },
  ],
  className: '',
  onFilterTypeSelected: () => {},
};

export default injectIntl(FilterType);
