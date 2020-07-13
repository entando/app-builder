import React from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';

const AboutPage = () => (
  <InternalPage className="AboutPage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <h2 className="AboutPage__title">
            Entando Platform
          </h2>
          <h3>
            About
          </h3>
          <section>
            <p className="AboutPage__description">
              Entando is a micro frontend platform that allows enterprises to build,
              and reuse applications built with micro frontends and microservices on Kubernetes.
            </p>
          </section>
          <h2 className="AboutPage__title">
          Version: 6.2
          </h2>
          <section>
            <p className="AboutPage__description">
            The documentation helps you learn about Entando Platform
            and start exploring its features.
            To get started using Entando Platform, visit
              <a href="https://dev.entando.org/" target="_blank" rel="noopener noreferrer"> dev.entando.org</a>
            </p>
          </section>
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default AboutPage;
