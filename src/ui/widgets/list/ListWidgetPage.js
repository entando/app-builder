import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import DeleteWidgetModalContainer from 'ui/widgets/list/DeleteWidgetModalContainer';

class ListWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  renderTable() {
    const {
      widgetList,
      onDelete,
      onEdit,
      locale,
    } = this.props;
    return (
      <Spinner loading={!!this.props.loading}>
        {
          Object.keys(widgetList).map(typology => (
            <WidgetListTable
              key={typology}
              title={typology}
              widgetList={widgetList[typology]}
              locale={locale}
              onDelete={onDelete}
              onEdit={onEdit}
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
  widgetList: PropTypes.shape({}),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  locale: PropTypes.string,
  loading: PropTypes.bool,
};

ListWidgetPage.defaultProps = {
  onWillMount: () => {},
  onDelete: () => {},
  onEdit: () => {},
  locale: 'en',
  widgetList: {},
  loading: false,
};


export default ListWidgetPage;
