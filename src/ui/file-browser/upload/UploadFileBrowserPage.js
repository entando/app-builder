import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Breadcrumb, Icon, ButtonGroup } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import UploadFileBrowserFormContainer from 'ui/file-browser/upload/UploadFileBrowserFormContainer';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';

import { ROUTE_FILE_BROWSER, ROUTE_FILE_BROWSER_UPLOAD } from 'app-init/router';


const UploadFileBrowserPage = ({ location: { pathname } }) => {
  const uploadFileButton = (
    <Button
      type="button"
      className="pull-right UploadFileBrowserPage__uploadFile"
      bsStyle="primary"
      disabled={pathname === ROUTE_FILE_BROWSER_UPLOAD}
    >
      <Icon size="lg" name="upload" />&nbsp;
      <FormattedMessage
        id="fileBrowser.uploadFile"
      />
    </Button>);
  return (
    <InternalPage className="UploadFileBrowserPage">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <FormattedMessage id="menu.configuration" />
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <FormattedMessage id="menu.fileBrowser" />
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PageTitle
              titleId="menu.fileBrowser"
              helpId="fileBrowser.help"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FileBreadcrumbContainer className="UploadFileBrowserPage__fileBreadcrumbContainer" />
          </Col>
          <Col xs={6}>
            <ButtonGroup className="pull-right">
              <Link to={ROUTE_FILE_BROWSER}>
                <Button
                  type="button"
                  className="pull-right UploadFileBrowserPage__createTextFile"
                  bsStyle="primary"
                >
                  <Icon size="lg" name="file-text" />&nbsp;
                  <FormattedMessage
                    id="fileBrowser.createTextFile"
                  />
                </Button>
              </Link>
              <Link to={ROUTE_FILE_BROWSER}>
                <Button
                  type="button"
                  className="pull-right UploadFileBrowserPage__createFolder"
                  bsStyle="primary"
                >
                  <Icon size="lg" name="folder" />&nbsp;
                  <FormattedMessage
                    id="fileBrowser.createFolder"
                  />
                </Button>
              </Link>
              {
                pathname === ROUTE_FILE_BROWSER_UPLOAD ? uploadFileButton : (
                  <Link to={ROUTE_FILE_BROWSER}>
                    {uploadFileButton}
                  </Link>
                )
              }
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col xs={12}>
            <UploadFileBrowserFormContainer />
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  );
};

UploadFileBrowserPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default UploadFileBrowserPage;
