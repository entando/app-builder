import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb, Grid, Row, Col } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditWidgetFormContainer from 'ui/widgets/edit/EditWidgetFormContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

class EditWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="EditWidgetPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_WIDGET_LIST}>
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
          <EditWidgetFormContainer />
        </Grid>
      </InternalPage>
    );
  }
}

EditWidgetPage.propTypes = {
  onWillMount: PropTypes.func,
  widgetName: PropTypes.string,
};

EditWidgetPage.defaultProps = {
  onWillMount: () => {},
  widgetName: '',
};

export default EditWidgetPage;
