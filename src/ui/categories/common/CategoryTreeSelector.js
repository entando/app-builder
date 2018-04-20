import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';

class CategoryTreeSelector extends Component {
  renderRows() {
    const { categories, input: { onChange, value } } = this.props;


    return categories.map((category, i) => {
      const onClickExpand = () => {
        if (!category.isEmpty) {
          this.props.onExpandCategory(category.code);
        }
      };
      const onClickSelect = () => onChange(category.code);

      const className = ['CategoryTreeSelector__column-td'];
      if (category.isEmpty) {
        className.push('CategoryTreeSelector__column-td--empty');
      }
      // higlight selected code
      if (category.code === value) {
        className.push('info');
      }

      return (
        <tr key={category.code} className="CategoryTreeSelector__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="CategoryTreeSelector__expand-area"
              style={{ paddingLeft: category.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={category.expanded} />
            </span>
            <span
              className="CategoryTreeSelector__select-area"
              role="button"
              tabIndex={i}
              onClick={onClickSelect}
              onKeyDown={onClickSelect}
            >
              <TreeNodeFolderIcon empty={category.isEmpty} />
              <span className="CategoryTreeSelector__category-name">
                { category.title }
              </span>
              <RowSpinner loading={!!category.loading} />
            </span>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="CategoryTreeSelector table table-bordered table-hover table-treegrid">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="category.tree" />
            </th>
          </tr>
        </thead>
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  }
}

CategoryTreeSelector.propTypes = {

  categories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),

  onExpandCategory: PropTypes.func,

  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

CategoryTreeSelector.defaultProps = {
  categories: [],
  onExpandCategory: () => {},
};

export default CategoryTreeSelector;
