import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import RowListContainer from 'ui/widgets/list/RowListContainer';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';

class ListFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="ListFragmentPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.fragments" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PageTitle
                titleId="fragment.list.title"
                helpId="fragment.help"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Link route={ROUTE_FRAGMENT_ADD}>
                <Button
                  type="button"
                  className="pull-right ListFragmentPage__add"
                  bsStyle="primary"
                  onClick={this.props.onClickCreate}
                >
                  <FormattedMessage
                    id="app.new"
                  />
                </Button>
              </Link>
              <WidgetListTable >
                <RowListContainer />
              </WidgetListTable>
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

ListFragmentPage.propTypes = {
  onClickCreate: PropTypes.func,
  onWillMount: PropTypes.func,
};

ListFragmentPage.defaultProps = {
  onClickCreate: () => {},
  onWillMount: () => {},
};


export default ListFragmentPage;
