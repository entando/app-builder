import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Col } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

class FileBreadcrumb extends Component {
  getProtectedFolderLabel() {
    if (this.props.pathInfo.protectedFolder === true) {
      return 'protected';
    }
    return 'public';
  }

  getItemLink(item) {
    const itemIndex = this.props.pathInfo.currentPath.indexOf(item) + item.length;
    return this.props.pathInfo.currentPath.substring(0, itemIndex);
  }

  renderProtectedFolderBreadcrumb() {
    if (this.props.pathInfo.protectedFolder !== null) {
      if (this.props.pathInfo.currentPath === '') {
        return (
          <BreadcrumbItem className="BreadcrumbItem__first-level-folder" key={this.getProtectedFolderLabel()}>
            {this.getProtectedFolderLabel()}
          </BreadcrumbItem>
        );
      }
      return (
        <BreadcrumbItem key={this.getProtectedFolderLabel()}>
          <a role="presentation" className="BreadcrumbItem__first-level-folder" onClick={() => this.props.updateFileBrowser(this.props.pathInfo.protectedFolder, '')}>
            {this.getProtectedFolderLabel()}
          </a>
        </BreadcrumbItem>
      );
    }
    return null;
  }


  renderItemsLinksBreadcrumb() {
    const path = this.props.pathInfo.currentPath.split('/');
    path.pop();
    return path.map(item => (
      <BreadcrumbItem key={item} >
        <a className="BreadcrumbItem__a-item-link" role="presentation" onClick={() => this.props.updateFileBrowser(this.props.pathInfo.protectedFolder, this.getItemLink(item))}>
          {item}
        </a>
      </BreadcrumbItem>));
  }

  renderCurrentItemBreadcrumb() {
    const item = this.props.pathInfo.currentPath.split('/').pop();
    if (item) {
      return (
        <BreadcrumbItem className="BreadcrumbItem__current-item" key={item}>
          {item}
        </BreadcrumbItem>);
    }
    return null;
  }

  renderRootFolderBreadcrumb() {
    if (this.props.pathInfo.protectedFolder === null) {
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
  }


  render() {
    return (
      <div className="FileBreadcrumb">
        <Col xs={12}>
          <Breadcrumb>
            {this.renderRootFolderBreadcrumb()}
            {this.renderProtectedFolderBreadcrumb()}
            {this.renderItemsLinksBreadcrumb()}
            {this.renderCurrentItemBreadcrumb()}
          </Breadcrumb>
        </Col>
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
