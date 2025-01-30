import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import FileButtonsGroupContainer from 'ui/file-browser/common/FileButtonsGroupContainer';
import CreateFolderFormContainer from 'ui/file-browser/add/CreateFolderFormContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

export const CreateFolderPageBody = () => (
  <InternalPage className="CreateFolderPage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.settings' },
      { label: 'menu.fileBrowser' },
      { label: 'fileBrowser.createFolder', active: true },
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
          <FileBreadcrumbContainer className="CreateFolderPage__fileBreadcrumbContainer" />
        </Col>
        <Col md={6}>
          <FileButtonsGroupContainer className="CreateFolderPage__fileButtonsGroupContainer" />
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <Col xs={12}>
          <CreateFolderFormContainer className="CreateFolderPage__createFolderFormContainer" />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(CreateFolderPageBody);
