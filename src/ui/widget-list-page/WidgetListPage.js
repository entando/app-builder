import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widget-list-page/WidgetListTable';
import RowListContainer from 'ui/widget-list-page/RowListContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'frontend-common-components';
import { ROUTE_WIDGET_FORM } from 'app-init/router';

class WidgetListPage extends Component {
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
    // alert('connect to create a new widget function');
  }

  render() {
    return (
      <InternalPage className="WidgetListPage">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <PageTitle
                titleId="widget.list.title"
                helpId="widget.help"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Link route={ROUTE_WIDGET_FORM}>
                <Button
                  type="button"
                  className="pull-right WidgetListPage__add"
                  bsStyle="primary"
                  onClick={this.onClickAdd}
                >
                  <FormattedMessage
                    id="widget.list.new"
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

WidgetListPage.propTypes = {
  onClickCreate: PropTypes.func,
  onWillMount: PropTypes.func,
};

WidgetListPage.defaultProps = {
  onClickCreate: () => {},
  onWillMount: () => {},
};


export default WidgetListPage;
