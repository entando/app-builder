import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import { appBuilderVersion } from 'helpers/versions';

const AboutPage = () => (
  <InternalPage className="AboutPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <h2 className="AboutPage__title">
            <FormattedMessage id="info.about" />
          </h2>
          <h3>
            <FormattedMessage id="info.about.entandoPlatform" />
          </h3>
          <p className="AboutPage__description">
            <FormattedMessage id="info.about.entando" />
          </p>
          <p className="AboutPage__description">
            <FormattedMessage id="info.about.docs" />
            <a href="https://dev.entando.org/" target="_blank" rel="noopener noreferrer"> dev.entando.org</a>
          </p>
          <p>
            <b><FormattedMessage id="info.about.version" values={{ version: appBuilderVersion }} /></b>
          </p>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AboutPage;
