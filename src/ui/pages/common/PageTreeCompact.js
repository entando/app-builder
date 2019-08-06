import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import TreeNodeFolderIcon from 'ui/common/tree-node/TreeNodeFolderIcon';
import TreeNodeExpandedIcon from 'ui/common/tree-node/TreeNodeExpandedIcon';
import RowSpinner from 'ui/pages/common/RowSpinner';
import {
  history,
  ROUTE_PAGE_ADD,
  ROUTE_PAGE_EDIT,
  ROUTE_PAGE_CONFIG,
} from 'app-init/router';
import { routeConverter } from 'helpers/routeConverter';

class PageTreeCompact extends Component {
  renderRows() {
    const { pages } = this.props;
    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          this.props.onExpandPage(page.code);
        }
      };
      const className = ['PageTreeCompact__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTreeCompact__tree-column-td--empty');
      }

      return (
        <tr key={page.code} className="PageTreeCompact__row">
          <td className={className.join(' ').trim()}>
            <span
              role="button"
              tabIndex={i}
              className="PageTreeCompact__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <TreeNodeExpandedIcon expanded={page.expanded} />
              <TreeNodeFolderIcon empty={page.isEmpty} />
              <span className="PageTreeCompact__page-name">
                { page.title }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
          <td className="text-center PageTreeCompact__status-col">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="text-center PageTreeCompact__actions-col">
            <DropdownKebab className="PageTreeCompact__kebab-button" key={page.code} id={page.code} pullRight>
              <MenuItem onClick={() => history.push(ROUTE_PAGE_ADD)}>
                <FormattedMessage id="app.add" />
              </MenuItem>
              <MenuItem
                onClick={() => history.push(routeConverter(
                  ROUTE_PAGE_EDIT,
                  { pageCode: page.code },
                ))}
              >
                <FormattedMessage id="app.edit" />
              </MenuItem>
              <MenuItem
                onClick={() => history.push(routeConverter(
                  ROUTE_PAGE_CONFIG,
                  { pageCode: page.code },
                ))}
              >
                <FormattedMessage id="app.configure" />
              </MenuItem>
              <MenuItem onClick={() => page.code} >
                <FormattedMessage id="app.details" />
              </MenuItem>
              <MenuItem onClick={() => page.code}>
                <FormattedMessage id="app.clone" />
              </MenuItem>
              <MenuItem onClick={() => page.code} >
                <FormattedMessage id="app.delete" />
              </MenuItem>
              <MenuItem onClick={() => page.code} >
                <FormattedMessage id="app.unpublish" />
              </MenuItem>
            </DropdownKebab>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="PageTreeCompact table table-hover">
        <tbody>
          { this.renderRows() }
        </tbody>
      </table>
    );
  }
}

PageTreeCompact.propTypes = {

  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),
  onExpandPage: PropTypes.func,
};

PageTreeCompact.defaultProps = {
  pages: [],
  onExpandPage: () => {},
};

export default PageTreeCompact;
