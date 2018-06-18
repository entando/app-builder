import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FileBreadcrumbContainer from 'ui/file-browser/common/FileBreadcrumbContainer';
import FileButtonsGroupContainer from 'ui/file-browser/common/FileButtonsGroupContainer';
import CreateTextFileFormContainer from 'ui/file-browser/add/CreateTextFileFormContainer';


const CreateTextFilePage = () => (
  <InternalPage className="CreateTextFilePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
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
        <Col xs={6}>
          <FileBreadcrumbContainer className="CreateTextFilePage__fileBreadcrumbContainer" />
        </Col>
        <Col xs={6}>
          <FileButtonsGroupContainer className="CreateTextFilePage__fileButtonsGroupContainer" />
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <Col xs={12}>
          <CreateTextFileFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default CreateTextFilePage;
