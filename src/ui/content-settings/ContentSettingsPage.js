import React from 'react';
import { Row, Col, CardGrid, Grid, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ContentSettingsGeneralContainer from 'ui/content-settings/ContentSettingsGeneralContainer';
import ContentSettingsCropRatiosContainer from 'ui/content-settings/ContentSettingsCropRatiosContainer';
import ContentSettingsMetadataListContainer from 'ui/content-settings/metadata/ContentSettingsMetadataListContainer';
import AddContentSettingsMetadataContainer from 'ui/content-settings/metadata/AddContentSettingsMetadataContainer';

const ContentSettingsPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.menu.contentsettings" defaultMessage="Settings" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.contentsettings.title"
            helpId="cms.contentsettings.titletip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CardGrid>
            <Row>
              <Col xs={12}>
                <ContentSettingsGeneralContainer />
                <AddContentSettingsMetadataContainer />
                <ContentSettingsMetadataListContainer />
                <ContentSettingsCropRatiosContainer />
              </Col>
            </Row>
          </CardGrid>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ContentSettingsPage;
