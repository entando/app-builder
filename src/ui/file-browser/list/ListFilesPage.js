import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb, Icon, ButtonGroup } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from '@entando/router';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FilesListTableContainer from 'ui/file-browser/list/FilesListTableContainer';
import FileBreadcrumbContainer from 'ui/file-browser/list/FileBreadcrumbContainer';

import { ROUTE_FILE_BROWSER } from 'app-init/router';


const ListFilesPage = () => (
  <InternalPage className="ListFilesPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.fileBrowser" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="menu.fileBrowser"
            helpId="fileBrowser.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FileBreadcrumbContainer className="ListFilesPage__fileBreadcrumbContainer" />
        </Col>
        <Col md={6}>
          <ButtonGroup className="pull-right">
            <Link route={ROUTE_FILE_BROWSER}>
              <Button
                type="button"
                className="pull-right ListFilesPage__createTextFile"
                bsStyle="primary"
              >
                <Icon size="lg" name="file-text" />&nbsp;
                <FormattedMessage
                  id="fileBrowser.createTextFile"
                />
              </Button>
            </Link>
            <Link route={ROUTE_FILE_BROWSER}>
              <Button
                type="button"
                className="pull-right ListFilesPage__createFolder"
                bsStyle="primary"
              >
                <Icon size="lg" name="folder" />&nbsp;
                <FormattedMessage
                  id="fileBrowser.createFolder"
                />
              </Button>
            </Link>
            <Link route={ROUTE_FILE_BROWSER}>
              <Button
                type="button"
                className="pull-right ListFilesPage__uploadFile"
                bsStyle="primary"
              >
                <Icon size="lg" name="upload" />&nbsp;
                <FormattedMessage
                  id="fileBrowser.uploadFile"
                />
              </Button>
            </Link>

          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <FilesListTableContainer className="ListFilesPage__fileListTableContainer" />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListFilesPage;
