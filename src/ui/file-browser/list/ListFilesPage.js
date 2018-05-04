import React from 'react';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from '@entando/router';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FilesListTableContainer from 'ui/file-browser/list/FilesListTableContainer';
import { ROUTE_GROUP_ADD } from 'app-init/router';

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
        <Col md={12}>
          <Link route={ROUTE_GROUP_ADD}>
            <Button
              type="button"
              className="pull-right ListGroupPage__add"
              bsStyle="primary"
            >
              <FormattedMessage
                id="app.add"
              />
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <FilesListTableContainer />
      </Row>
    </Grid>
  </InternalPage>
);

export default ListFilesPage;
