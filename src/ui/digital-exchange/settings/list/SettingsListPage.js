import React from 'react';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsListContainer from 'ui/digital-exchange/settings/list/SettingsListContainer';
import { ROUTE_DE_CONFIG_ADD } from 'app-init/router';

const SettingsListPage = () => (
  <InternalPage className="SettingsListPage">
    <Grid>
      <Row>
        <Col md={12}>
          <PageTitle
            titleId="digitalExchange.settings.title"
            helpId="digitalExchange.settings.help"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button componentClass={Link} route={ROUTE_DE_CONFIG_ADD} bsStyle="primary" className="pull-right">
            <FormattedMessage id="digitalExchange.settings.add" />
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
