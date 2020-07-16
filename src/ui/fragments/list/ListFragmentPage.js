import React, { Component } from 'react';
import { Grid, Row, Col, Breadcrumb, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsFragmentFormContainer from 'ui/fragments/list/SettingsFragmentFormContainer';
import FragmentListContent from 'ui/fragments/list/FragmentListContent';
import withPermissions from 'ui/auth/withPermissions';
import { ROLE_SUPERUSER } from 'state/permissions/const';

const TAB_LIST = 'list';
const TAB_SETTINGS = 'settings';

export class ListFragmentPageBody extends Component {
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
      <FragmentListContent />
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
                  <FormattedMessage id="menu.uxComponents" />
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
                  <FormattedMessage id="app.list" />
                </MenuItem>
                <MenuItem
                  className="ListFragmentPage__header-tab"
                  active={this.state.activeTab === TAB_SETTINGS}
                  onClick={() => this.setActiveTab(TAB_SETTINGS)}
                >
                  <FormattedMessage id="app.settings" />
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

export default withPermissions(ROLE_SUPERUSER)(ListFragmentPageBody);
