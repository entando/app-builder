import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ComponentListContainer from 'ui/digital-exchange/components/list/ComponentListContainer';
import ComponentListViewModeSwitcherContainer from 'ui/digital-exchange/components/common/ComponentListViewModeSwitcherContainer';

const ComponentListPage = () => (
  <InternalPage className="ComponentListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="digitalExchange.component.list.title"
            helpId="digitalExchange.component.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} >
          <div className="pull-right">
            <ComponentListViewModeSwitcherContainer />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ComponentListContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ComponentListPage;
