import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import SearchFormInput from 'ui/common/form/RenderSearchFormInput';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import CategoryTreeFileItem from 'ui/categories/filter/CategoryTreeFilterItem';

import { eventToConfirm } from 'ui/common/accessibility/KeyCodes';

class CategoryTreeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeExpanded: true,
      searchFilter: null,
    };
    this.onApply = this.onApply.bind(this);
    this.onExpandTree = this.onExpandTree.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }


  onExpandTree(e) {
    const {
      clickConfirmed,
      keyConfirmed,
    } = eventToConfirm(e);

    if (clickConfirmed || keyConfirmed) {
      const { treeExpanded } = this.state;
      this.setState({
        treeExpanded: !treeExpanded,
      });
    }
  }

  onApply(cat, fileType) {
    const {
      onApplyFilteredSearch, filteringCategories, assetType, paginationOptions,
      onCheckCategory,
    } = this.props;
    let categories = filteringCategories.slice(0);
    const contains = filteringCategories.filter(c => c.code === cat.code).length !== 0;
    if (contains) {
      categories = filteringCategories.filter(c => c.code !== cat.code);
    } else {
      categories.push(cat);
    }
    const { perPage } = paginationOptions;
    const filteringParams = categories.map((filter, i) => (
      `&filters[${i}].attribute=categories&filters[${i}].value=${filter.code}`
    )).join('');
    const typeParams = assetType === 'all' ? '' : `type=${assetType}`;
    const fetchParams = `?${typeParams}${`&page=${1}&pageSize=${perPage}`}${filteringParams}`;
    onCheckCategory(cat, fileType);
    onApplyFilteredSearch(categories, fetchParams);
  }

  onSearchValueChange(keyword) {
    this.setState({
      searchFilter: keyword === '' ? keyword : new RegExp(`${keyword}`, 'i'),
    });
  }

  onClearSearch() {
    this.setState({
      searchFilter: '',
    });
  }

  render() {
    const {
      language,
      categories,
      filteringCategories,
      onCheckCategory,
      minimal,
      filterSubject,
      hideIfEmpty,
    } = this.props;

    const { treeExpanded, searchFilter } = this.state;

    const categoriesWithoutRoot = categories.filter(c => c.code !== 'home');
    const categoriesFiltered = searchFilter
      ? categoriesWithoutRoot.filter(c => searchFilter.test(c.titles[language]))
      : categoriesWithoutRoot;
    const categoryRows = categoriesFiltered.map((category, i) => (
      <CategoryTreeFileItem
        category={category}
        checked={filteringCategories.filter(fc => fc.code === category.code).length > 0}
        key={category.code}
        i={i}
        expanded
        language={language}
        onCheckCategory={minimal ? onCheckCategory : this.onApply}
        filterSubject={filterSubject}
      />
    ));

    const showNothing = hideIfEmpty
    && (!categoriesWithoutRoot || categoriesWithoutRoot.length === 0);

    return (
      showNothing ? null : (
        <div>
          {
            minimal ? null : (
              <div className="CategorySearchInputWrapper">
                <SearchFormInput
                  name="searchCategory"
                  textfieldClass="CategoryTreeInput__search"
                  onValueChange={this.onSearchValueChange}
                  onClear={this.onClearSearch}
                  placeholder="Search Category"
                />
              </div>
            )
          }
          <table className="CategoryTreeFilter">
            {
            minimal ? null : (
              <thead>
                <tr>
                  <th
                    className="CategoryTreeFilter__head"
                    role="button"
                    onClick={this.onExpandTree}
                    onKeyDown={this.onExpandTree}
                    tabIndex={0}
                  >
                    <TreeNodeExpandedIcon expanded={treeExpanded} />
                    <span className="CategoryTreeFilter__title">
                      <FormattedMessage id="cms.assets.list.categories" />
                    </span>
                  </th>
                </tr>
              </thead>
            )}
            {treeExpanded ? (
              <tbody>
                <RovingTabIndexProvider direction="vertical">
                  {categoryRows}
                </RovingTabIndexProvider>
              </tbody>
            ) : null}
          </table>
          <br />
        </div>
      ));
  }
}

CategoryTreeFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  paginationOptions: PropTypes.shape({
    perPage: PropTypes.number,
  }).isRequired,
  onDidMount: PropTypes.func,
  onCheckCategory: PropTypes.func,
  language: PropTypes.string.isRequired,
  onApplyFilteredSearch: PropTypes.func,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  assetType: PropTypes.string.isRequired,
  minimal: PropTypes.bool,
  filterSubject: PropTypes.string.isRequired,
  hideIfEmpty: PropTypes.bool,
};

CategoryTreeFilter.defaultProps = {
  categories: [],
  onDidMount: () => {},
  onCheckCategory: () => {},
  onApplyFilteredSearch: () => {},
  minimal: false,
  hideIfEmpty: false,
};

export default CategoryTreeFilter;
