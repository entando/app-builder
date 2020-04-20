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
            titleId="componentRepository.disabled.title"
            helpId="componentRepository.disabled.help"
          />
          <p><FormattedMessage id="componentRepository.disabled.help" /></p>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default ComponentListPageDisabled;
