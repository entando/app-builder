import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Col, ButtonGroup, Button, Icon } from 'patternfly-react';

import { Link } from '@entando/router';
import { ROUTE_FILE_BROWSER_CREATE_TEXT_FILE, ROUTE_FILE_BROWSER_CREATE_FOLDER, ROUTE_FILE_BROWSER_UPLOAD } from 'app-init/router';

class FileButtonsGroup extends Component {
  renderButtons() {
    if ((this.props.pathInfo.currentPath !== '') || (this.props.pathInfo.protectedFolder !== null)) {
      return (
        <ButtonGroup className="pull-right">
          <Button
            type="button"
            className="pull-right FilesButtonGroup__createTextFile"
            bsStyle="primary"
            componentClass={Link}
            route={ROUTE_FILE_BROWSER_CREATE_TEXT_FILE}
          >
            <Icon size="lg" name="file-text" />&nbsp;
            <FormattedMessage
              id="fileBrowser.createTextFile"
            />
          </Button>
          <Button
            type="button"
            className="pull-right FilesButtonGroup__createFolder"
            bsStyle="primary"
            componentClass={Link}
            route={ROUTE_FILE_BROWSER_CREATE_FOLDER}
          >
            <Icon size="lg" name="folder" />&nbsp;
            <FormattedMessage
              id="fileBrowser.createFolder"
            />
          </Button>
          <Button
            type="button"
            className="pull-right FilesButtonGroup__uploadFile"
            bsStyle="primary"
            componentClass={Link}
            route={ROUTE_FILE_BROWSER_UPLOAD}
          >
            <Icon size="lg" name="upload" />&nbsp;
            <FormattedMessage
              id="fileBrowser.uploadFile"
            />
          </Button>
        </ButtonGroup>);
    }
    return null;
  }

  render() {
    return (
      <div className="FileButtonsGroup">
        <Col xs={12}>
          {this.renderButtons()}
        </Col>
      </div>
    );
  }
}

FileButtonsGroup.propTypes = {
  pathInfo: PropTypes.shape({
    protectedFolder: PropTypes.bool,
    prevPath: PropTypes.string,
    currentPath: PropTypes.string.isRequired,
  }),
};

FileButtonsGroup.defaultProps = {
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

export default FileButtonsGroup;
