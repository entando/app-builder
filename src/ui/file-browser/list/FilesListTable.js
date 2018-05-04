import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner, Icon } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import DeleteGroupModalContainer from 'ui/groups/common/DeleteGroupModalContainer';

class FilesListTable extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderTableRows() {
    const getRowIcon = (isFolder) => {
      if (isFolder) {
        return <Icon size="lg" name="folder" />;
      }
      return <Icon size="lg" name="file" />;
    };

    return this.props.files.map(file => (
      <tr key={file.path}>
        <td className="FilesListRow__td">{getRowIcon(file.directory)} {file.name}</td>
        <td className="FilesListRow__td">{file.path}</td>
        <td className="FilesListRow__td">{file.size}</td>
        <td className="FilesListRow__td">{file.lastModifiedTime}</td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.files.length > 0) {
      return (
        <Col xs={12}>
          <table className="FilesListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th className="FilesListTable__th-lg"><FormattedMessage id="file.link" /></th>
                <th className="FilesListTable__th-lg"><FormattedMessage id="file.path" /></th>
                <th className="FilesListTable__th-lg"><FormattedMessage id="file.size" /></th>
                <th className="FilesListTable__th-lg"><FormattedMessage id="file.lastModifiedTime" /></th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRows()}
            </tbody>
          </table>
        </Col>
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="group.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="GroupListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <DeleteGroupModalContainer />
        </Spinner>
      </div>
    );
  }
}

FilesListTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    lastModifiedTime: PropTypes.string,
    size: PropTypes.number,
    directory: PropTypes.bool,
    path: PropTypes.string,
  })),
};

FilesListTable.defaultProps = {
  files: [],
};

export default FilesListTable;
