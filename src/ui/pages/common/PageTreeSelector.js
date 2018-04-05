import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';

class PageTreeSelector extends Component {
  renderRows() {
    const { pages, input: { onChange, value } } = this.props;


    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          this.props.onExpandPage(page.code);
        }
      };
      const onClickSelect = () => onChange(page.code);

      const className = ['PageTreeSelector__column-td'];
      if (page.isEmpty) {
        className.push('PageTreeSelector__column-td--empty');
      }
      // higlight selected code
      if (page.code === value) {
        className.push('info');
      }

      return (
        <tr key={page.code} className="PageTreeSelector__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="PageTreeSelector__expand-area"
              style={{ paddingLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
            </span>
            <span
              className="PageTreeSelector__select-area"
              role="button"
              tabIndex={i}
              onClick={onClickSelect}
              onKeyDown={onClickSelect}
            >
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTreeSelector__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="PageTreeSelector table table-bordered table-hover table-treegrid">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="pageTree.pageTree" />
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

PageTreeSelector.propTypes = {

  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),

  onExpandPage: PropTypes.func,

  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

PageTreeSelector.defaultProps = {
  pages: [],
  onExpandPage: () => {},
};

export default PageTreeSelector;
