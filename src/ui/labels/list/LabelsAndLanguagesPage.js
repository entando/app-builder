import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, MenuItem } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import LanguageFormContainer from 'ui/labels/list/LanguageFormContainer';


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
        <h1>LABELS LIST</h1>
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
          <Row>
            <Col xs={12}>
              { pageContent }
            </Col>
          </Row>
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
