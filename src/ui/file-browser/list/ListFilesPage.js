import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FilesListTableContainer from 'ui/file-browser/list/FilesListTableContainer';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import FileButtonsGroupContainer from 'ui/file-browser/common/FileButtonsGroupContainer';

const ListFilesPage = () => (
  <InternalPage className="ListFilesPage">
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
          <FileButtonsGroupContainer className="ListFilesPage__fileButtonsGroupContainer" />
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
