import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTitle from 'ui/internal-page/PageTitle';
import FilesListTableContainer from 'ui/file-browser/list/FilesListTableContainer';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import FileButtonsGroupContainer from 'ui/file-browser/common/FileButtonsGroupContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const ListFilesPageBody = () => (
  <InternalPage className="ListFilesPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.settings' },
      { label: 'menu.fileBrowser', active: true },
    ]}
    />
    <Grid fluid>
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
        <Col md={6} className="btnGroup">
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

export default withPermissions(SUPERUSER_PERMISSION)(ListFilesPageBody);
