import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Col } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

class FileBreadcrumb extends Component {
  renderFileBreadcrumb() {
    const getProtectedFolderLabel = () => {
      if (this.props.pathInfo.protectedFolder === true) {
        return 'protected';
      }
      return 'public';
    };

    const renderProtectedFolderBreadcrumb = () => {
      if (typeof this.props.pathInfo.protectedFolder !== 'undefined') {
        if (this.props.pathInfo.currentPath === '') {
          return (
            <BreadcrumbItem className="BreadcrumbItem__first-level-folder" key={getProtectedFolderLabel()}>
              {getProtectedFolderLabel()}
            </BreadcrumbItem>
          );
        }
        return (
          <BreadcrumbItem key={getProtectedFolderLabel()}>
            <a role="presentation" className="BreadcrumbItem__first-level-folder" onClick={() => this.props.updateFileBrowser(this.props.pathInfo.protectedFolder, '')}>
              {getProtectedFolderLabel()}
            </a>
          </BreadcrumbItem>
        );
      }
      return null;
    };

    const getItemLink = (item) => {
      const itemIndex = this.props.pathInfo.currentPath.indexOf(item) + item.length;
      return this.props.pathInfo.currentPath.substring(0, itemIndex);
    };

    const renderItemsLinksBreadcrumb = () => {
      const path = this.props.pathInfo.currentPath.split('/');
      path.pop();
      return path.map(item => (
        <BreadcrumbItem key={item} >
          <a className="BreadcrumbItem__a-item-link" role="presentation" onClick={() => this.props.updateFileBrowser(this.props.pathInfo.protectedFolder, getItemLink(item))}>
            {item}
          </a>
        </BreadcrumbItem>));
    };

    const renderCurrentItemBreadcrumb = () => {
      const item = this.props.pathInfo.currentPath.split('/').pop();
      if (item) {
        return (
          <BreadcrumbItem className="BreadcrumbItem__current-item" key={item}>
            {item}
          </BreadcrumbItem>);
      }
      return null;
    };

    const renderRootFolderBreadcrumb = () => {
      if (typeof this.props.pathInfo.protectedFolder === 'undefined') {
        return (
          <BreadcrumbItem className="BreadcrumbItem__root">
            root
          </BreadcrumbItem>
        );
      }
      return (
        <BreadcrumbItem>
          <a className="BreadcrumbItem__root-link" role="presentation" onClick={() => this.props.updateFileBrowser()}>root</a>
        </BreadcrumbItem>
      );
    };

    return (
      <div>
        <Col xs={12}>
          <Breadcrumb>
            {renderRootFolderBreadcrumb()}
            {renderProtectedFolderBreadcrumb()}
            {renderItemsLinksBreadcrumb()}
            {renderCurrentItemBreadcrumb()}
          </Breadcrumb>
        </Col>
      </div>
    );
  }

  render() {
    return (
      <div className="FileBreadcrumb">
        {this.renderFileBreadcrumb()}
      </div>
    );
  }
}

FileBreadcrumb.propTypes = {
  updateFileBrowser: PropTypes.func.isRequired,
  pathInfo: PropTypes.shape({
    protectedFolder: PropTypes.bool,
    prevPath: PropTypes.string,
    currentPath: PropTypes.string.isRequired,
  }),
};

FileBreadcrumb.defaultProps = {
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

export default FileBreadcrumb;
