import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';

import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import PageTitle from 'ui/internal-page/PageTitle';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import EditTextFileFormContainer from 'ui/file-browser/edit/EditTextFileFormContainer';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const EditTextFilePageBody = () => (
  <InternalPage className="EditTextFilePage">
    <HeaderBreadcrumb breadcrumbs={[
      { label: 'menu.settings' },
      { label: 'menu.fileBrowser' },
      { label: 'fileBrowser.createTextFile', active: true },
    ]}
    />
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="fileBrowser.createTextFile"
            helpId="fileBrowser.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FileBreadcrumbContainer className="CreateTextFilePage__fileBreadcrumbContainer" />
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <Col xs={12}>
          <EditTextFileFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default withPermissions(SUPERUSER_PERMISSION)(EditTextFilePageBody);
