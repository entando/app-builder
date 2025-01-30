import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'patternfly-react';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import AddDatabaseListTableContainer from 'ui/database/add/AddDatabaseListTableContainer';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

class AddDatabasePage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    return (
      <InternalPage className="AddDatabasePage">
        <HeaderBreadcrumb breadcrumbs={[{ label: 'menu.settings' }, { label: 'menu.database' }]} />
        <Grid fluid>
          <Row />
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
