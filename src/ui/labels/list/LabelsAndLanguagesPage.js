import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, MenuItem, Button, Paginator, Spinner } from 'patternfly-react';
import { Link } from '@entando/router';
import { BreadcrumbItem } from 'frontend-common-components';
import LabelSearchFormContainer from 'ui/labels/list/LabelSearchFormContainer';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import LanguageFormContainer from 'ui/labels/list/LanguageFormContainer';
import LabelsTabsContainer from 'ui/labels/list/LabelsTabsContainer';
import { ROUTE_LABEL_ADD } from 'app-init/router';

const TAB_LANGUAGES = 'languages';
const TAB_LABELS = 'labels';

class LabelsAndLanguagesPage extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);

    this.setActiveTab = this.setActiveTab.bind(this);
    this.state = {
      activeTab: TAB_LANGUAGES,
    };
  }

  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  render() {
    let pageContent;

    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    if (this.state.activeTab === TAB_LANGUAGES) {
      pageContent = (
        <Spinner loading={!!this.props.loadingLangs}>
          <LanguageFormContainer />
        </Spinner>
      );
    } else {
      pageContent = (
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={6} xsOffset={3}>
                <LabelSearchFormContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Link route={ROUTE_LABEL_ADD}>
                  <Button
                    type="button"
                    className="pull-right LabelsAndLanguagesPage__add-label"
                    bsStyle="primary"
                  >
                    <FormattedMessage
                      id="app.add"
                    />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Spinner loading={!!this.props.loadingLabels}>
                  <LabelsTabsContainer />
                  <Paginator
                    pagination={pagination}
                    viewType="table"
                    itemCount={this.props.totalItems}
                    onPageSet={this.changePage}
                    onPerPageSelect={this.changePageSize}
                  />
                </Spinner>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
    return (
      <InternalPage className="LabelsAndLanguagesPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.configuration" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.labelsAndLanguages" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="LabelsAndLanguagesPage__header-container">
                <Row>
                  <Col xs={6}>
                    <PageTitle titleId="menu.labelsAndLanguages" helpId="labelsAndLanguages.help" />
                  </Col>
                  <Col xs={6}>
                    <ul className="nav nav-tabs nav-justified nav-tabs-pattern">
                      <MenuItem
                        className="LabelsAndLanguagesPage__header-tab"
                        active={this.state.activeTab === TAB_LANGUAGES}
                        onClick={() => this.setActiveTab(TAB_LANGUAGES)}
                      >
                        <FormattedMessage id="app.languages" />
                      </MenuItem>
                      <MenuItem
                        className="LabelsAndLanguagesPage__header-tab"
                        active={this.state.activeTab === TAB_LABELS}
                        onClick={() => this.setActiveTab(TAB_LABELS)}
                      >
                        <FormattedMessage id="app.systemLabels" />
                      </MenuItem>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          { pageContent }
        </Grid>
      </InternalPage>
    );
  }
}

LabelsAndLanguagesPage.propTypes = {
  onWillMount: PropTypes.func,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loadingLabels: PropTypes.bool,
  loadingLangs: PropTypes.bool,
};

LabelsAndLanguagesPage.defaultProps = {
  onWillMount: null,
  loadingLabels: false,
  loadingLangs: false,
};

export default LabelsAndLanguagesPage;
