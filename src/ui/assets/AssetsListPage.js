import React from 'react';
import { Row, Col, Grid, Breadcrumb, CardGrid } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import AssetsUploadContainer from 'ui/assets/AssetsUploadContainer';
import AssetsCountContainer from 'ui/assets/AssetsCountContainer';
import AssetsListContainer from 'ui/assets/AssetsListContainer';
import EditAssetFormModalContainer from 'ui/assets/EditAssetFormModalContainer';
import DeleteAssetModalContainer from 'ui/assets/DeleteAssetModalContainer';
import AssetsAdvancedSearchContainer from 'ui/assets/AssetsAdvancedSearchContainer';
import CloneAssetModalContainer from 'ui/assets/modals/clone-asset/CloneAssetModalContainer';

const AssetsListPage = () => (
  <InternalPage>
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.title" defaultMessage="CMS" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="cms.assets.title" defaultMessage="Digital Assets" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <CMSPageTitle
            titleId="cms.assets.title"
            helpId="cms.assets.tip"
            position="pull-right"
            largeTitle
          />
        </Col>
      </Row>
      <Row>
        <CardGrid>
          <Col xs={6}>
            <AssetsUploadContainer />
          </Col>
          <Col xs={6}>
            <AssetsCountContainer />
          </Col>
        </CardGrid>
      </Row>
      <Row>
        <Col xs={12}>
          <AssetsAdvancedSearchContainer />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AssetsListContainer />
        </Col>
      </Row>
      <EditAssetFormModalContainer />
      <DeleteAssetModalContainer />
      <CloneAssetModalContainer />
    </Grid>
  </InternalPage>
);

export default AssetsListPage;
