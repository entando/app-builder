import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner, Icon } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { routeConverter } from '@entando/utils';
import DeleteFolderModalContainer from 'ui/file-browser/common/DeleteFolderModalContainer';
import DeleteFileModalContainer from 'ui/file-browser/common/DeleteFileModalContainer';
import FilesListMenuActions from 'ui/file-browser/list/FilesListMenuActions';

import { ROUTE_FILE_BROWSER_EDIT_TEXT_FILE } from 'app-init/router';

class FilesListTable extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderTableRows(isRootPath) {
    const { onClickDeleteFolder, onClickDeleteFile, onClickDownload } = this.props;

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

    const getLinkItem = (file) => {
      if (file.directory) {
        return (
          <a className="FilesListTable__link-dir" role="presentation" onClick={() => this.props.onWillMount(getProtectedFolder(file.path), getQueryString(file.path))}>
            <Icon size="lg" name="folder" /> {file.name}
          </a>
        );
      }
      const canEdit = file.name.endsWith('.txt') || file.name.endsWith('.css');
      if (canEdit) {
        return (
          <Link className="FilesListTable__link-download" to={routeConverter(ROUTE_FILE_BROWSER_EDIT_TEXT_FILE, { filename: file.name })}>
            <Icon size="lg" name="file" /> {file.name}
          </Link>
        );
      }
      return (
        <a className="FilesListTable__link-download" role="presentation" download onClick={() => onClickDownload(file)}>
          <Icon size="lg" name="file" /> {file.name}
        </a>
      );
    };

    return this.props.files.map(file => (
      <tr key={file.path}>
        <td className="FilesListRow__td">{getLinkItem(file)}</td>
        {
          !isRootPath && (
            <React.Fragment>
              <td className="FilesListRow__td">{file.size !== null ? `${file.size} byte` : null} </td>
              <td className="FilesListRow__td">{file.lastModifiedTime}</td>
              <td className="FilesListRow__td">
                <FilesListMenuActions
                  file={file}
                  onClickDownload={onClickDownload}
                  onClickDeleteFolder={onClickDeleteFolder}
                  onClickDeleteFile={onClickDeleteFile}
                />
              </td>
            </React.Fragment>
          )
        }
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

    const isRootPath = this.props.files.every(file =>
      file.size === null && file.lastModifiedTime === null && (file.name === 'public' || file.name === 'protected'));

    const size = this.props.files.length;

    if (size === 0) {
      return (
        <Col xs={12}>
          <Alert type="warning">
            <strong><FormattedMessage id="fileBrowser.list.empty" /></strong><br />
          </Alert>
        </Col>
      );
    }

    if (isRootPath) {
      return (
        <div>
          <Col xs={12}>
            <table className="FilesListTable__table table table-striped table-hover">
              <thead>
                <tr>
                  <th className="FilesListTable__th-lg">{renderUpLink()}</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableRows(isRootPath)}
              </tbody>
            </table>
          </Col>
        </div>
      );
    }
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

  render() {
    return (
      <div className="FilesListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <DeleteFolderModalContainer />
          <DeleteFileModalContainer />
        </Spinner>
      </div>
    );
  }
}

FilesListTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onClickDownload: PropTypes.func,
  onClickDeleteFolder: PropTypes.func,
  onClickDeleteFile: PropTypes.func,
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
  onClickDownload: () => {},
  onClickDeleteFolder: () => {},
  onClickDeleteFile: () => {},
  loading: false,
  files: [],
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

export default FilesListTable;
