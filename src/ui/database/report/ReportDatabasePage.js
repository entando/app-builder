import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import ReportDatabaseListTable from 'ui/database/report/ReportDatabaseListTable';


class ReportDatabasePage extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    return (
      <InternalPage className="ReportDatabasePage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.settings" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.database" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="menu.database"
                helpId="database.help"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="well panel">
                <dl className="margin-none dl-horizontal">
                  <dt>
                    <FormattedMessage id="app.date" />
                  </dt>
                  <dd>
                    <code>
                      {this.props.report.date}
                    </code>
                  </dd>
                  <dt>
                    <FormattedMessage id="app.requiredTime" />
                  </dt>
                  <dd>
                    <code>
                      {this.props.report.requiredTime}&nbsp;<FormattedMessage id="app.milliseconds" />
                    </code>
                  </dd>
                </dl>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ReportDatabaseListTable
                loading={this.props.loading}
                report={this.props.report}
              />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

ReportDatabasePage.propTypes = {
  onWillMount: Proptypes.func.isRequired,
  loading: Proptypes.bool,
  report: Proptypes.shape({
    requiredTime: Proptypes.number,
    date: Proptypes.string,
  }).isRequired,
};

ReportDatabasePage.defaultProps = {
  loading: false,
};

export default ReportDatabasePage;
