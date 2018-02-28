import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import RowListContainer from 'ui/widgets/list/RowListContainer';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'frontend-common-components';
import { ROUTE_WIDGET_ADD } from 'app-init/router';

class ListWidgetPage extends Component {
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
      <InternalPage className="ListWidgetPage">
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
              <Link route={ROUTE_WIDGET_ADD}>
                <Button
                  type="button"
                  className="pull-right ListWidgetPage__add"
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

ListWidgetPage.propTypes = {
  onClickCreate: PropTypes.func,
  onWillMount: PropTypes.func,
};

ListWidgetPage.defaultProps = {
  onClickCreate: () => {},
  onWillMount: () => {},
};


export default ListWidgetPage;
