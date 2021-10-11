import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Grid, Breadcrumb, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ContentTemplateSearchFormContainer from 'ui/content-template/ContentTemplateSearchFormContainer';
import ContentTemplateListContainer from 'ui/content-template/ContentTemplateListContainer';
import { ROUTE_CMS_CONTENTTEMPLATE_ADD } from 'app-init/router';

const ContentTemplateListPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.menu.contenttemplates" defaultMessage="Content Templates" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contenttemplate.title"
            helpId="cms.contenttemplate.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row className="ContentTemplateList__filter">
        <Col xs={8} xsOffset={2}>
          <ContentTemplateSearchFormContainer />
        </Col>
        <Col xs={1} />
      </Row>
      <Row>
        <Col xs={12}>
          <ContentTemplateListContainer />
        </Col>
      </Row>
      <Row className="ContentTemplateList__filter">
        <Col xs={10} />
        <Col xs={2}>
          <Link to={ROUTE_CMS_CONTENTTEMPLATE_ADD}>
            <Button bsStyle="primary" className="ContentTemplateList__addbutton">
              <FormattedMessage id="cms.contenttemplate.add.label" defaultMessage="Add Content Template" />
            </Button>
          </Link>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentTemplateListPage;
