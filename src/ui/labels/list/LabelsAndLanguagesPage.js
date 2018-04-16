import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, MenuItem, Button } from 'patternfly-react';
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

  render() {
    let pageContent;
    if (this.state.activeTab === TAB_LANGUAGES) {
      pageContent = (
        <LanguageFormContainer />
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
                <LabelsTabsContainer />
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
            <Col xs={6}>
              <PageTitle titleId="menu.labelsAndLanguages" helpId="labelsAndLanguages.help" />
            </Col>
            <Col xs={6}>
              <ul className="LabelsAndLanguagesPage__header-container nav nav-tabs nav-justified nav-tabs-pattern">
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
          { pageContent }
        </Grid>
      </InternalPage>
    );
  }
}

LabelsAndLanguagesPage.propTypes = {
  onWillMount: PropTypes.func,
};

LabelsAndLanguagesPage.defaultProps = {
  onWillMount: null,
};

export default LabelsAndLanguagesPage;
