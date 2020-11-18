import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import EditTextFileFormContainer from 'ui/file-browser/edit/EditTextFileFormContainer';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

export const EditTextFilePageBody = () => (
  <InternalPage className="EditTextFilePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.settings" />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <FormattedMessage id="menu.fileBrowser" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="fileBrowser.createTextFile" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
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

export default withPermissions(ROLE_SUPERUSER)(EditTextFilePageBody);
