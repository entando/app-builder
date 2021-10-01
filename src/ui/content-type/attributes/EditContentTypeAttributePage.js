import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import EditContentTypeAttributeFormContainer from 'ui/content-type/attributes/EditContentTypeAttributeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST } from 'app-init/router';

const EditContentTypeAttributePage = () => (
  <Grid>
    <Row>
      <Col xs={12}>
        <Breadcrumb>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.title" defaultMessage="CMS" />
          </BreadcrumbItem>
          <BreadcrumbItem to={ROUTE_CMS_CONTENTTYPE_LIST}>
            <FormattedMessage id="cms.menu.contenttypes" defaultMessage="Content Types" />
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="cms.contenttype.edit.label" />
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <CMSPageTitle
          titleId="cms.contenttype.attribute.edit.title"
          position="pull-right"
          largeTitle
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <ErrorsAlertContainer />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <EditContentTypeAttributeFormContainer />
      </Col>
    </Row>
  </Grid>
);

export default EditContentTypeAttributePage;
