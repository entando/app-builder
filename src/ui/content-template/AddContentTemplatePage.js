import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import AddContentTemplateFormContainer from 'ui/content-template/AddContentTemplateFormContainer';

const AddContentTemplatePage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem to="/cms/content-templates">
              <FormattedMessage id="cms.menu.contenttemplates" defaultMessage="Content Templates" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contenttemplate.add.label" defaultMessage="Add" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contenttemplate.add.label"
            helpId="cms.contenttemplate.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AddContentTemplateFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AddContentTemplatePage;
