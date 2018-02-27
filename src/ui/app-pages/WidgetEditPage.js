import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import { Breadcrumb, Grid, Row, Col } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import PageTitle from 'ui/internal-page/PageTitle';
import WidgetEditFormContainer from 'ui/widgets/WidgetEditFormContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

class WidgetEditPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="WidgetEditPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                <BreadcrumbItem route={ROUTE_WIDGET_LIST}>
                  <FormattedMessage id="menu.widgets" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.widgetEdit" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.widgetName}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle titleId="widget.page.edit.pageTitle" helpId="widget.help" />
            </Col>
          </Row>
          <WidgetEditFormContainer />
        </Grid>
      </InternalPage>
    );
  }
}

WidgetEditPage.propTypes = {
  onWillMount: PropTypes.func,
  widgetName: PropTypes.string,
};

WidgetEditPage.defaultProps = {
  onWillMount: () => {},
  widgetName: '',
};

export default WidgetEditPage;
