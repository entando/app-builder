import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import DataModelListTable from 'ui/data-models/list/DataModelListTable';
import DataModelSearchFormContainer from 'ui/data-models/common/DataModelSearchFormContainer';
import RowListContainer from 'ui/data-models/list/RowListContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';
import { ROUTE_DATA_MODEL_ADD } from 'app-init/router';

class DataModelListPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.onClickAdd = this.onClickAdd.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  onClickAdd(ev) {
    ev.preventDefault();
    this.props.onClickCreate();
    // alert('connect to create a new datamodel function');
  }

  render() {
    return (
      <InternalPage className="DataModelListPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.data" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.datamodel" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PageTitle
                titleId="menu.datamodel"
                helpId="datamodel.help"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} mdOffset={3}>
              <DataModelSearchFormContainer />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Link route={ROUTE_DATA_MODEL_ADD} className="pull-right">
                <Button
                  className="Datamodel__add"
                  bsStyle="primary"
                  onClick={this.onClickAdd}
                >
                  <FormattedMessage id="app.new" />
                </Button>
              </Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <DataModelListTable >
                <RowListContainer />
              </DataModelListTable>
              {/* paginator */}
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

DataModelListPage.propTypes = {
  onClickCreate: PropTypes.func,
  onWillMount: PropTypes.func,
};

DataModelListPage.defaultProps = {
  onClickCreate: () => {},
  onWillMount: () => {},
};


export default DataModelListPage;
