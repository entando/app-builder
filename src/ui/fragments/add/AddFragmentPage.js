import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import PageTitle from 'ui/internal-page/PageTitle';
import AddFormContainer from 'ui/fragments/add/AddFormContainer';
import InternalPage from 'ui/internal-page/InternalPage';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';

const FRAGMENT_HELP = 'fragment.help';
const PAGE_TITLE = 'app.add';

const AddFragmentPage = () => (

  <InternalPage className="AddFragmentPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route={ROUTE_FRAGMENT_LIST}>
              <FormattedMessage id="menu.fragments" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id={PAGE_TITLE} />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle titleId={PAGE_TITLE} helpId={FRAGMENT_HELP} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <AddFormContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);


export default AddFragmentPage;
