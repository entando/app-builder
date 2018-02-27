import React from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import AddFormContainer from 'ui/fragments/add/AddFormContainer';
import PageTitle from 'ui/internal-page/PageTitle';

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
            {/* FIXME change route when fragmentlist component is avaible */}
            <BreadcrumbItem route="home">
              <FormattedMessage id="menu.uxPattern.fragment" />
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
