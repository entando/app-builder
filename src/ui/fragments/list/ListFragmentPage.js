import React, { Component } from 'react';
import { Grid, Row, Col, Button, Breadcrumb, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem, Link } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import FragmentListTableContainer from 'ui/fragments/list/FragmentListTableContainer';
import FragmentSearchFormContainer from 'ui/fragments/list/FragmentSearchFormContainer';
import SettingsFragmentFormContainer from 'ui/fragments/list/SettingsFragmentFormContainer';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';

const TAB_LIST = 'list';
const TAB_SETTINGS = 'settings';

class ListFragmentPage extends Component {
  constructor(props) {
    super(props);
    this.setActiveTab = this.setActiveTab.bind(this);

    this.state = {
      activeTab: TAB_LIST,
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  renderContent() {
    return this.state.activeTab === TAB_LIST ?
      <div>
        <Row>
          <Col xs={6} xsOffset={3}>
            <FragmentSearchFormContainer />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Link route={ROUTE_FRAGMENT_ADD}>
              <Button
                type="button"
                className="pull-right ListFragmentPage__add"
                bsStyle="primary"
              >
                <FormattedMessage
                  id="app.new"
                />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <FragmentListTableContainer />
        </Row>
      </div>
      : <SettingsFragmentFormContainer />;
  }

  render() {
    return (
      <InternalPage className="ListFragmentPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.fragments" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <PageTitle
                titleId="fragment.list.title"
                helpId="fragment.help"
              />
            </Col>
            <Col xs={6}>
              <ul className="nav nav-tabs nav-justified nav-tabs-pattern">
                <MenuItem
                  className="ListFragmentPage__header-tab"
                  active={this.state.activeTab === TAB_LIST}
                  onClick={() => this.setActiveTab(TAB_LIST)}
                >
                  <FormattedMessage id="app.languages" />
                </MenuItem>
                <MenuItem
                  className="ListFragmentPage__header-tab"
                  active={this.state.activeTab === TAB_SETTINGS}
                  onClick={() => this.setActiveTab(TAB_SETTINGS)}
                >
                  <FormattedMessage id="app.systemLabels" />
                </MenuItem>
              </ul>
            </Col>
          </Row>
          {this.renderContent()}
        </Grid>
      </InternalPage>
    );
  }
}

export default ListFragmentPage;
