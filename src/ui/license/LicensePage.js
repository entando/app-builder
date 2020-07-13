import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';

const LicensePage = () => (
  <InternalPage className="LicensePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <h2 className="LicensePage__title">
          License
          </h2>
          <section>
            <p className="LicensePage__description">
              {`
The Entando platform is 100% open source and as a whole is licensed under the LGPL V3.0.

A free commercial open source license is available for Entando platform and the Entando Component Repository for customers with Gold and Platinum subscriptions. With this license, you can freely extend or modify Entando without requiring the contribution of confidential IP back to the open source community. The Subscription entitles you to receive support services, intended as maintenance and warranty of the software (bug fixing), for all the products and components subscribed throughout the period of the contract.
                `}
              <br />
              LGPL V 3.0 licence
              <br />
              <a href="https://www.gnu.org/licenses/lgpl-3.0.en.html" target="_blank" rel="noopener noreferrer">https://www.gnu.org/licenses/lgpl-3.0.en.html</a>
            </p>
          </section>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default LicensePage;
