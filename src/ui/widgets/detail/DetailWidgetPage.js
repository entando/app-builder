import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import DetailWidgetElement from 'ui/widgets/detail/DetailWidgetElement';

class DetailWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const { widgetInfo, defaultLanguage } = this.props;
    return (
      <InternalPage className="DetailWidgetPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_WIDGET_LIST}>
                  <FormattedMessage id="menu.uxComponents.widget" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="app.info" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="widget.detail.title"
                titleParam={{
                  widgetDescription:
                    widgetInfo.titles && widgetInfo.titles[defaultLanguage],
                  }}
                helpId="widget.help"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ErrorsAlertContainer />
              <DetailWidgetElement widgetInfo={widgetInfo} />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

DetailWidgetPage.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  widgetInfo: PropTypes.shape({}).isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export default DetailWidgetPage;
