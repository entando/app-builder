import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';

const CMSDisabledPage = () => (
  <InternalPage className="CMSDisabledPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="cms.disabled.title"
            helpId="cms.disabled.help"
          />
          <p><FormattedMessage id="cms.disabled.help" /></p>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default CMSDisabledPage;
