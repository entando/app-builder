import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button, Breadcrumb, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import DeleteWidgetModalContainer from 'ui/widgets/list/DeleteWidgetModalContainer';

class ListWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  renderTable() {
    const {
      groupedWidgets,
      widgetGroupingList,
      onDelete,
      onEdit,
      onNewUserWidget,
      locale,
    } = this.props;
    return (
      <Spinner loading={!!this.props.loading}>
        {
          widgetGroupingList.map(grouping => (
            <WidgetListTable
              key={grouping}
              title={grouping}
              widgetList={groupedWidgets[grouping]}
              locale={locale}
              onDelete={onDelete}
              onEdit={onEdit}
              onNewUserWidget={onNewUserWidget}
            />
          ))
        }
      </Spinner>
    );
  }

  render() {
    return (
      <InternalPage className="ListWidgetPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.uxComponents.widget" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="widget.list.title"
                helpId="widget.help"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              {this.renderTable()}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                type="button"
                className="pull-right ListWidgetPage__add"
                bsStyle="primary"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
              >
                <FormattedMessage id="app.add" />
              </Button>
            </Col>
          </Row>
          <DeleteWidgetModalContainer />
        </Grid>
      </InternalPage>
    );
  }
}

ListWidgetPage.propTypes = {
  onWillMount: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onNewUserWidget: PropTypes.func,
  locale: PropTypes.string,
  groupedWidgets: PropTypes.shape({}),
  widgetGroupingList: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

ListWidgetPage.defaultProps = {
  onWillMount: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onNewUserWidget: () => {},
  locale: 'en',
  groupedWidgets: {},
  widgetGroupingList: [],
  loading: false,
};


export default ListWidgetPage;
