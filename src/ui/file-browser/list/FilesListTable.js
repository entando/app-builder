import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner, Icon, DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

class FilesListTable extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  onClickDownload = file => (ev) => {
    ev.preventDefault();
    this.props.onClickDownload(file);
  }

  renderTableRows() {
    const downloadLabel = <FormattedMessage id="fileBrowser.downloadFile" />;
    const deleteLabel = <FormattedMessage id="app.delete" />;

    const getProtectedFolder = (path) => {
      switch (path) {
        case 'public':
          return 'false';
        case 'protected':
          return 'true';
        default:
          return this.props.pathInfo.protectedFolder;
      }
    };

    const getQueryString = (path) => {
      if (['protected', 'public'].includes(path)) {
        return null;
      }
      return path;
    };

    const getActionsMenuItem = (file) => {
      if ((file.name !== 'protected') && (file.name !== 'public')) {
        if (file.directory) {
          return (
            <DropdownKebab pullRight id={`${file.name}-actions`}>
              <LinkMenuItem
                id={`delete-${file.name}`}
                route={ROUTE_FILE_BROWSER}
                params={{ fileName: file.name }}
                label={deleteLabel}
                className="FilesListMenuAction__menu-item-detail"
              />
            </DropdownKebab>
          );
        }
        return (
          <DropdownKebab pullRight id={`${file.name}-actions`}>
            <MenuItem
              id={`download-${file.name}`}
              className="FilesListMenuAction__menu-item-detail"
              onClick={this.onClickDownload(file)}
            >
              {downloadLabel}
            </MenuItem>
            <LinkMenuItem
              id={`delete-${file.name}`}
              route={ROUTE_FILE_BROWSER}
              params={{ fileName: file.name }}
              label={deleteLabel}
              className="FilesListMenuAction__menu-item-detail"
            />
          </DropdownKebab>
        );
      }
      return <div />;
    };


    const getLinkItem = (file) => {
      if (file.directory) {
        return (
          <a className="FilesListTable__link-dir" role="presentation" onClick={() => this.props.onWillMount(getProtectedFolder(file.path), getQueryString(file.path))}>
            <Icon size="lg" name="folder" /> {file.name}
          </a>
        );
      }
      return (
        <a className="FilesListTable__link-download" role="presentation" download onClick={this.onClickDownload(file)}>
          <Icon size="lg" name="file" /> {file.name}
        </a>
      );
    };

    return this.props.files.map(file => (
      <tr key={file.path}>
        <td className="FilesListRow__td">{getLinkItem(file)}</td>
        <td className="FilesListRow__td">{file.size}</td>
        <td className="FilesListRow__td">{file.lastModifiedTime}</td>
        <td className="FilesListRow__td">{getActionsMenuItem(file)}</td>
      </tr>
    ));
  }

  renderTable() {
    const renderUpLink = () => {
      const pfolder = this.props.pathInfo.protectedFolder;
      const prev = this.props.pathInfo.prevPath;
      const current = this.props.pathInfo.currentPath;
      if (pfolder === null) {
        return <div />;
      } else if (prev === null && current === '') {
        return (
          <a className="FilesListTable__up-link" role="presentation" onClick={() => this.props.onWillMount()}>
            <Icon size="lg" name="share" className="fa-rotate-270" /> <FormattedMessage id="fileBrowser.list.upLink" />
          </a>);
      }
      return (
        <a className="FilesListTable__up-link" role="presentation" onClick={() => this.props.onWillMount(pfolder, prev)}>
          <Icon size="lg" name="share" className="fa-rotate-270" /> <FormattedMessage id="fileBrowser.list.upLink" />
        </a>);
    };


    if (this.props.files.length > 0) {
      return (
        <div>
          <Col xs={12}>
            <table className="FilesListTable__table table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="FilesListTable__th-lg">{renderUpLink()}</th>
                  <th className="FilesListTable__th-lg"><FormattedMessage id="fileBrowser.list.size" /></th>
                  <th className="FilesListTable__th-lg"><FormattedMessage id="fileBrowser.list.lastModifiedTime" /></th>
                  <th className="FilesListTable__th-lg"><FormattedMessage id="app.actions" /></th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </table>
          </Col>
        </div>
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="fileBrowser.list.empty" /></strong><br />
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="FilesListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

FilesListTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onClickDownload: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    lastModifiedTime: PropTypes.string,
    size: PropTypes.number,
    directory: PropTypes.bool,
    path: PropTypes.string,
  })),
  pathInfo: PropTypes.shape({
    protectedFolder: PropTypes.bool,
    prevPath: PropTypes.string,
    currentPath: PropTypes.string.isRequired,
  }),
};

FilesListTable.defaultProps = {
  loading: false,
  files: [],
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

export default FilesListTable;
