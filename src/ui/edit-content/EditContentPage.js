import React from 'react';
import { Row, Col, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import EditContentFormContainer from 'ui/edit-content/EditContentFormContainer';

const EditContentPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row className="CMSShell__fixed-heading startTopPos startLeftPos">
        <Col xs={12}>
          <Breadcrumb className="editcontent">
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem to="/cms/contents">
              <FormattedMessage id="cms.menu.contents" defaultMessage="Contents" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.contents.edit.title" defaultMessage="Edit" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contents.edit.title"
            helpId="cms.contents.edit.titletip"
            noHeaderMargin
            largeTitle
          />
          <div className="FormGroupSeparator" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <EditContentFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default EditContentPage;
