import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Grid, Breadcrumb, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ContentTypeListContainer from 'ui/content-type/ContentTypeListContainer';
import { ROUTE_CMS_CONTENTTYPE_ADD } from 'app-init/router';

const ContentTypeListPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contenttype.title"
            helpId="cms.contenttype.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ContentTypeListContainer />
        </Col>
      </Row>
      <Row className="ContentTypeList__filter">
        <Col xs={10} />
        <Col xs={2}>
          <Link to={ROUTE_CMS_CONTENTTYPE_ADD}>
            <Button bsStyle="primary" className="ContentTypeList__addbutton">
              <FormattedMessage id="cms.contenttype.add.label" defaultMessage="Add" />
            </Button>
          </Link>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentTypeListPage;
