import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import DataModelListTable from 'ui/data/data-model/list/DataModelListTable';
// import DataModelListContainer from 'ui/widgets/list/DataModelListContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'frontend-common-components';
import { ROUTE_WIDGET_ADD } from 'app-init/router';

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
            <Col md={12}>
              <PageTitle
                titleId="datamodel.list.title"
                helpId="datamodel.help"
              />
            </Col>
          </Row>
          <Row>
            <h1>search panel</h1>
            <Col md={12}>
              <Link route={ROUTE_WIDGET_ADD}>
                <Button
                  type="button"
                  className="pull-right ListWidgetPage__add"
                  bsStyle="primary"
                  onClick={this.onClickAdd}
                >
                  <FormattedMessage
                    id="datamodel.list.new"
                  />
                </Button>
              </Link>
              <DataModelListTable >
                {/* <DataModelListContainer /> */}
              </DataModelListTable>
              <h1>paginator</h1>
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
