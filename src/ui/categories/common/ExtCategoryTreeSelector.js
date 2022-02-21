import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Label } from 'patternfly-react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import ExtCategoryTreeSelectorRow from 'ui/categories/common/ExtCategoryTreeSelectorRow';

const ExtCategoryTreeSelector = ({
  input,
  language,
  categories,
  onJoinCategory,
  onToggleExpandCategory,
  onExpandCategory,
  getJoinedCategoriesByCodes: joinedCategories,
  onUnjoinCategory,
  onExpandAll,
  onCollapseAll,
}) => {
  const contentCategoriesText = joinedCategories && joinedCategories.length > 0 ? (
    <h4>
      <FormattedMessage id="cms.contents.edit.contentCategoryList" />
    </h4>
  ) : null;

  const [selectedRow, setSelectedRow] = useState('');

  const renderedTags = joinedCategories.map((value) => {
    const countSlashes = (value.fullTitles[language].match(/\//g) || []).length;
    return (
      <li key={value.code}>
        <Label key={value.code} bsStyle="info" className="CategoryTreeSelector__tag">
          <span className="icon fa fa-tag" />
          {'.. / '.repeat(countSlashes)}
          {value.titles[language]}
          <Button
            bsStyle="link"
            className="MultiSelectRenderer__remove-tag-btn"
            onClick={() => onUnjoinCategory(value.code)}
          >
            <i className="fa fa-times" />
          </Button>
        </Label>
      </li>
    );
  });

  const categoryRows = categories.map((category, i) => (
    <ExtCategoryTreeSelectorRow
      category={category}
      key={category.code}
      i={i}
      language={language}
      selectedRow={selectedRow}
      setSelectedRow={setSelectedRow}
      onToggleExpandCategory={onToggleExpandCategory}
      onExpandCategory={onExpandCategory}
      onJoinCategory={onJoinCategory}
      onUnjoinCategory={onUnjoinCategory}
      input={input}
    />
  ));

  return (
    <div>
      <table className="ExtCategoryTreeSelector table table-bordered table-hover table-treegrid">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="category.tree" />
              <div
                onClick={onExpandAll}
                onKeyDown={onExpandAll}
                role="button"
                tabIndex={-1}
                className="CategoryTree CategoryTree__toggler CategoryTree__toggler--expand"
              >
                <span className="icon fa fa-plus-square" />
                <FormattedMessage id="pageTree.expand" />
              </div>
              <div
                onClick={onCollapseAll}
                onKeyDown={onCollapseAll}
                role="button"
                tabIndex={-2}
                className="CategoryTree CategoryTree__toggler"
              >
                <span className="icon fa fa-minus-square" />
                <FormattedMessage id="pageTree.collapse" />
              </div>
            </th>
            <th className="text-center" style={{ width: '4%' }}>
              <FormattedMessage id="cms.join" />
            </th>
          </tr>
        </thead>
        <tbody>
          <RovingTabIndexProvider direction="vertical">
            {categoryRows}
          </RovingTabIndexProvider>
        </tbody>
      </table>
      <br />
      <div>
        {contentCategoriesText}
        <ul className="ExtCategoryTreeSelector__tag-container list-inline">{renderedTags}</ul>
      </div>
    </div>
  );
};

ExtCategoryTreeSelector.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  onToggleExpandCategory: PropTypes.func,
  onExpandCategory: PropTypes.func,
  onJoinCategory: PropTypes.func,
  onUnjoinCategory: PropTypes.func,

  language: PropTypes.string.isRequired,

  getJoinedCategoriesByCodes: PropTypes.arrayOf(PropTypes.shape({})),

  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  onExpandAll: PropTypes.func.isRequired,
  onCollapseAll: PropTypes.func.isRequired,
};

ExtCategoryTreeSelector.defaultProps = {
  categories: [],
  getJoinedCategoriesByCodes: [],
  onToggleExpandCategory: () => {},
  onExpandCategory: () => {},
  onJoinCategory: () => {},
  onUnjoinCategory: () => {},
};

export default ExtCategoryTreeSelector;
