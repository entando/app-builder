import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import SearchFormInput from 'ui/common/form/RenderSearchFormInput';
import { Col, ControlLabel } from 'patternfly-react';

import CategoryTreeItem from 'ui/common/category/CategoryTreeItem';

const RenderCategoryTreeInput = ({
  input,
  categories,
  language,
  label,
  labelSize,
  inputSize,
  append,
  alignClass,
  meta: { touched, error },
  help,
  xsClass,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const categoriesWithoutRoot = categories.filter(c => c.code !== 'home');
  const categoriesFiltered = searchFilter
    ? categoriesWithoutRoot.filter(c => searchFilter.test(c.titles[language]))
    : categoriesWithoutRoot;

  const onCheckCategory = (catselected) => {
    let newVal;
    const valIdx = input.value.indexOf(catselected.code);
    if (valIdx === -1) {
      newVal = [...input.value, catselected.code];
    } else {
      newVal = [...input.value];
      newVal.splice(valIdx, 1);
    }
    input.onChange(newVal);
  };

  const onSearchValueChange = keyword => (
    setSearchFilter(keyword === '' ? keyword : new RegExp(`${keyword}`, 'i'))
  );

  const onClearSearch = () => setSearchFilter('');

  const categoryRows = categoriesFiltered.map((category, i) => (
    <CategoryTreeItem
      category={category}
      checked={input.value.includes(category.code)}
      key={category.code}
      i={i}
      language={language}
      onCheckCategory={onCheckCategory}
    />
  ));

  return (
    <div className={touched && error ? 'form-group has-error' : 'form-group'}>
      {labelSize > 0 ? (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel>
            {label} {help}
          </ControlLabel>
        </Col>
      ) : (
        ''
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <div className="CategoryTreeInput">
          <SearchFormInput
            name="searchCategory"
            textfieldClass="CategoryTreeInput__search"
            onValueChange={onSearchValueChange}
            onClear={onClearSearch}
            placeholder="Search Category"
          />
          <div className="CategoryTreeInput__treebody">
            <table className="CategoryTreeFilter">
              <tbody>
                <RovingTabIndexProvider direction="vertical">
                  {categoryRows}
                </RovingTabIndexProvider>
              </tbody>
            </table>
          </div>
        </div>
      </Col>
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && (error && <span className="help-block">{error}</span>)}
    </div>
  );
};

RenderCategoryTreeInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    onChange: PropTypes.func,
  }),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  language: PropTypes.string.isRequired,
  append: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  label: PropTypes.node,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
};

RenderCategoryTreeInput.defaultProps = {
  input: {},
  categories: [],
  meta: {},
  label: '',
  help: null,
  labelSize: 2,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  xsClass: 'mobile-left',
};

export default RenderCategoryTreeInput;
