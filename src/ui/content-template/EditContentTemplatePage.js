import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import EditContentTemplateFormContainer from 'ui/content-template/EditContentTemplateFormContainer';

const EditContentTemplatePage = () => (
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
              <FormattedMessage id="cms.contenttemplate.edit.label" defaultMessage="Edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.label.edit"
            helpId="cms.contenttemplate.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditContentTemplateFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditContentTemplatePage;
