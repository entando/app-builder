import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col } from 'patternfly-react';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';
import DetailWidgetElement from 'ui/widgets/detail/DetailWidgetElement';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';

class DetailWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const { widgetInfo, defaultLanguage } = this.props;
    return (
      <InternalPage className="DetailWidgetPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.uxComponents.widget', to: ROUTE_WIDGET_LIST },
          { label: 'app.info', active: true },
        ]}
        />
        <Grid fluid>
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
  widgetInfo: PropTypes.shape({
    titles: PropTypes.shape({}),
  }).isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export default DetailWidgetPage;
