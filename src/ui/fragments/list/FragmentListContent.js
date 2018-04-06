import React from 'react';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'frontend-common-components';

import FragmentListTableContainer from 'ui/fragments/list/FragmentListTableContainer';
import FragmentSearchFormContainer from 'ui/fragments/list/FragmentSearchFormContainer';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';

const FragmentListContent = () => (
  <div className="FragmentListContent">
    <Row>
      <Col xs={6} xsOffset={3}>
        <FragmentSearchFormContainer />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <Link route={ROUTE_FRAGMENT_ADD}>
          <Button
            type="button"
            className="pull-right FragmentListContent__add"
            bsStyle="primary"
          >
            <FormattedMessage
              id="app.new"
            />
          </Button>
        </Link>
      </Col>
    </Row>
    <Row>
      <FragmentListTableContainer />
    </Row>
  </div>

);
export default FragmentListContent;
