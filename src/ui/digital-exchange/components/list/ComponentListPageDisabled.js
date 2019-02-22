import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';

const ComponentListPageDisabled = () => (
  <InternalPage className="ComponentListPageDisabled">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="digitalExchange.disabled.title"
            helpId="digitalExchange.disabled.help"
          />
          <p><FormattedMessage id="digitalExchange.disabled.help" /></p>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ComponentListPageDisabled;
