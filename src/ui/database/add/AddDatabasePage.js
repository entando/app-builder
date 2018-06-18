import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddDatabaseListTableContainer from 'ui/database/add/AddDatabaseListTableContainer';

class AddDatabasePage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    return (
      <InternalPage className="AddDatabasePage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.configuration" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.database" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="menu.database"
                helpId="database.help"
              />
            </Col>
          </Row>
          <Row >
            <AddDatabaseListTableContainer />
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

AddDatabasePage.propTypes = {
  onWillMount: PropTypes.func.isRequired,
};


export default AddDatabasePage;
