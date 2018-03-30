import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem, Col } from 'patternfly-react';
import CategoryFolderIcon from 'ui/categories/common/CategoryFolderIcon';
import CategoryExpandedIcon from 'ui/categories/common/CategoryExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';

class CategoryTree extends Component {
  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  renderRows() {
    const { categories } = this.props;
    return categories.map((category, i) => {
      const onClickExpand = () => {
        if (!category.isEmpty) {
          this.props.onExpandCategory(category.code);
        }
      };
      const className = ['CategoryTree__tree-column-td'];
      if (category.isEmpty) {
        className.push('CategoryTree__tree-column-td--empty');
      }

      return (
        <tr key={category.code} className="CategoryTree__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="CategoryTree__icons-label"
              style={{ marginLeft: category.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <CategoryExpandedIcon expanded={category.expanded} />
              <CategoryFolderIcon empty={category.isEmpty} />
              <span className="CategoryTree__category-name">
                { category.title }
              </span>
              <RowSpinner loading={!!category.loading} />
            </span>
          </td>
          <td className="text-center">
            <DropdownKebab className="CategoryTree__kebab-button" key={category.code} id={category.code} pullRight>
              <MenuItem onClick={() => console.info(`clicked DETAIL on category ${category.code}`)} >
                <FormattedMessage id="app.details" />
              </MenuItem>
              <MenuItem onClick={() => console.info(`clicked ADD on category ${category.code}`)} >
                <FormattedMessage id="app.add" />
              </MenuItem>
              <MenuItem onClick={() => console.info(`clicked EDIT on category ${category.code}`)} >
                <FormattedMessage id="app.edit" />
              </MenuItem>
              <MenuItem onClick={() => console.info(`clicked DELETE on category ${category.code}`)} >
                <FormattedMessage id="app.delete" />
              </MenuItem>
            </DropdownKebab>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Col xs={12}>
        <table className="CategoryTree CategoryTree__table table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="category.tree" />
              </th>
              <th className="GroupListTable__th-xs text-center">
                <FormattedMessage id="app.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </Col>
    );
  }
}

CategoryTree.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  onWillMount: PropTypes.func,
  onExpandCategory: PropTypes.func,
};

CategoryTree.defaultProps = {
  categories: [],
  onWillMount: null,
  onExpandCategory: () => {},
};

export default CategoryTree;
