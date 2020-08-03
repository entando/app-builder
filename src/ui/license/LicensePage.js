import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';

const LicensePage = () => (
  <InternalPage className="LicensePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <h2 className="LicensePage__title">
            <FormattedMessage id="info.license" />
          </h2>
          <section>
            <p className="LicensePage__description">
              <FormattedMessage id="info.license.description" />
            </p>
            <p>
              <a href="https://www.gnu.org/licenses/lgpl-3.0.en.html" target="_blank" rel="noopener noreferrer">
                <FormattedMessage id="info.license.type" />
              </a>
            </p>
          </section>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default LicensePage;
