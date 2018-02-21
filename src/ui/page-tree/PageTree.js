import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { DDTable } from 'frontend-common-components';
import PageStatusIcon from 'ui/page-tree/PageStatusIcon';
import PageFolderIcon from 'ui/page-tree/PageFolderIcon';
import PageExpandedIcon from 'ui/page-tree/PageExpandedIcon';
import RowSpinner from 'ui/page-tree/RowSpinner';
import PageTreePreviewContainer from 'ui/page-tree/PageTreePreviewContainer';
import PageTreeActionMenu from 'ui/page-tree/PageTreeActionMenu';

class PageTree extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(dropType, sourcePage, targetPage) {
    switch (dropType) {
      case DDTable.DROP_MEDIUM:
        this.props.onDropIntoPage(sourcePage.code, targetPage.code);
        break;
      case DDTable.DROP_HIGH:
        this.props.onDropAbovePage(sourcePage.code, targetPage.code);
        break;
      case DDTable.DROP_LOW:
        this.props.onDropBelowPage(sourcePage.code, targetPage.code);
        break;
      default: break;
    }
  }

  renderRows() {
    const { pages, locale } = this.props;


    return pages.map((page, i) => {
      const onClickExpand = () => {
        if (!page.isEmpty) {
          this.props.onExpandPage(page.code);
        }
      };
      const className = ['PageTree__tree-column-td'];
      if (page.isEmpty) {
        className.push('PageTree__tree-column-td--empty');
      }

      return (
        <DDTable.Tr key={page.code} rowData={page} className="PageTree__row">
          <td className={className.join(' ').trim()}>
            <DDTable.Handle>
              <button className="PageTree__drag-handle btn btn-primary">
                <i className="fa fa-arrows" />
              </button>
            </DDTable.Handle>
            <span
              role="button"
              tabIndex={i}
              className="PageTree__icons-label"
              style={{ marginLeft: page.depth * 24 }}
              onClick={onClickExpand}
              onKeyDown={onClickExpand}
            >
              <PageExpandedIcon expanded={page.expanded} />
              <PageFolderIcon empty={page.isEmpty} />
              <span className="PageTree__page-name">
                { page.titles[locale] }
              </span>
              <RowSpinner loading={!!page.loading} />
            </span>
          </td>
          <td className="text-center">
            <PageStatusIcon status={page.status} />
          </td>
          <td className="text-center">
            <FormattedMessage id={page.displayedInMenu ? 'app.yes' : 'app.no'} />
          </td>
          <td className="text-center">
            <PageTreeActionMenu
              page={page}
              onClickAdd={() => console.info(`clicked ADD on page ${page.code}`)}
              onClickEdit={() => console.info(`clicked EDIT on page ${page.code}`)}
              onClickConfigure={() => console.info(`clicked CONFIGURE on page ${page.code}`)}
              onClickDetails={() => console.info(`clicked DETAILS on page ${page.code}`)}
              onClickClone={() => console.info(`clicked CLONE on page ${page.code}`)}
              onClickDelete={() => console.info(`clicked DELETE on page ${page.code}`)}
              onClickPublish={() => console.info(`clicked PUBLISH on page ${page.code}`)}
              onClickUnpublish={() => console.info(`clicked UNPUBLISH on page ${page.code}`)}
            />
          </td>
        </DDTable.Tr>
      );
    });
  }

  render() {
    return (
      <DDTable onDrop={this.handleDrop} PreviewRenderer={PageTreePreviewContainer}>
        <table className="PageTree table table-bordered table-hover table-treegrid">
          <thead>
            <tr>
              <th width="70%">
                <FormattedMessage id="pageTree.pageTree" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.status" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.displayedInMenu" />
              </th>
              <th className="text-center" width="10%">
                <FormattedMessage id="pageTree.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </DDTable>
    );
  }
}

PageTree.propTypes = {
  locale: PropTypes.string.isRequired,

  pages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    titles: PropTypes.shape({
      en: PropTypes.string.isRequired,
      it: PropTypes.string.isRequired,
    }).isRequired,
    depth: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  })),

  onDropIntoPage: PropTypes.func,
  onDropAbovePage: PropTypes.func,
  onDropBelowPage: PropTypes.func,
  onExpandPage: PropTypes.func,
};

PageTree.defaultProps = {
  pages: [],
  onDropIntoPage: () => {},
  onDropAbovePage: () => {},
  onDropBelowPage: () => {},
  onExpandPage: () => {},
};

export default PageTree;
