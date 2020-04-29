import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsListContainer from 'ui/component-repository/settings/list/SettingsListContainer';
import { ROUTE_ECR_CONFIG_ADD } from 'app-init/router';

const SettingsListPage = () => (
  <InternalPage className="SettingsListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="componentRepository.settings.title"
            helpId="componentRepository.settings.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button componentClass={Link} to={ROUTE_ECR_CONFIG_ADD} bsStyle="primary" className="pull-right">
            <FormattedMessage id="componentRepository.settings.add" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <SettingsListContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default SettingsListPage;
