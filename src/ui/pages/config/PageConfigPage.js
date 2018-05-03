import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, DropdownButton, MenuItem } from 'patternfly-react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { formattedText } from '@entando/utils';
import { BreadcrumbItem } from 'frontend-common-components';

import { PAGE_STATUS_PUBLISHED } from 'state/pages/const';

import InternalPage from 'ui/internal-page/InternalPage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import PageConfigGridContainer from 'ui/pages/config/PageConfigGridContainer';
import ToolbarPageConfigContainer from 'ui/pages/config/ToolbarPageConfigContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';


const TRANSLATED_YES = formattedText('app.yes');
const TRANSLATED_NO = formattedText('app.no');

class PageConfigPage extends Component {
  constructor(props) {
    super(props);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);
    this.state = {
      infoTableOpen: false,
    };
  }

  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount(this.props);
  }

  toggleInfoTable() {
    this.setState({
      infoTableOpen: !this.state.infoTableOpen,
    });
  }

  render() {
    const {
      pageName, pageStatus, pageDiffersFromPublished, pageIsOnTheFly, isOnTheFlyEnabled,
      setSelectedPageOnTheFly, pageIsPublished, restoreConfig, publishPage, unpublishPage,
      applyDefaultConfig, pageConfigMatchesDefault,
    } = this.props;

    let defaultConfigBtn;
    if (pageConfigMatchesDefault) {
      defaultConfigBtn = (
        <div>
          <span className="PageConfigPage__default-applied-label">
            <FormattedMessage id="pageConfig.defaultWidgetApplied" />
          </span>
          <i className="PageConfigPage__default-applied-icon fa fa-check-circle-o" />
        </div>
      );
    } else {
      defaultConfigBtn = (
        <Button
          className="PageConfigPage__apply-default-btn btn-entando-apply"
          onClick={applyDefaultConfig}
        >
          <FormattedMessage id="pageConfig.applyDefaultWidget" />
        </Button>
      );
    }
    return (
      <InternalPage className="PageConfigPage">
        <Grid fluid>
          <Row>
            <Col xs={8} lg={9} xl={10}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageConfig" />
                </BreadcrumbItem>
              </Breadcrumb>

              <h1 className="PageConfigPage__title">
                <PageStatusIcon
                  status={pageStatus}
                  differsFromPublished={pageDiffersFromPublished}
                />
                { pageName }
              </h1>

              <ErrorsAlertContainer />

              <Row className="PageConfigPage__toolbar-row">
                <Col xs={12}>
                  <ButtonToolbar className="pull-left">
                    <Button
                      className="PageConfigPage__info-btn"
                      bsStyle="default"
                      onClick={this.toggleInfoTable}
                    >
                      <FormattedMessage id="app.info" />
                    </Button>
                    <Button bsStyle="primary" onClick={this.toggleInfoTable}>
                      <FormattedMessage id="app.preview" />
                    </Button>
                  </ButtonToolbar>
                  <ButtonToolbar className="pull-right">
                    <Button
                      bsStyle="warning"
                      onClick={restoreConfig}
                      disabled={!pageDiffersFromPublished}
                    >
                      <FormattedMessage id="app.restore" />
                    </Button>
                    <Button
                      className="PageConfigPage__unpublish-btn"
                      bsStyle="default"
                      onClick={unpublishPage}
                      disabled={!pageIsPublished}
                    >
                      <FormattedMessage id="app.unpublish" />
                    </Button>
                    <Button
                      className="PageConfigPage__publish-btn"
                      bsStyle="success"
                      onClick={publishPage}
                      disabled={pageIsPublished}
                    >
                      <FormattedMessage id="app.publish" />
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="PageConfigPage__toolbar-row">
                <Col xs={12}>
                  <ButtonToolbar className="pull-left">
                    { defaultConfigBtn }
                  </ButtonToolbar>
                  <div className="pull-right">
                    <label className="PageConfigPage__on-the-fly-label">
                      <FormattedMessage id="pageConfig.onTheFlyPage" />
                    </label>
                    <DropdownButton
                      id="dropdown-on-the-fly"
                      bsStyle="default"
                      title={pageIsOnTheFly ? TRANSLATED_YES : TRANSLATED_NO}
                      pullRight
                      disabled={!isOnTheFlyEnabled}
                    >
                      <MenuItem
                        eventKey="1"
                        className="PageConfigPage__on-the-fly-yes"
                        onClick={() => setSelectedPageOnTheFly && setSelectedPageOnTheFly(true)}
                      >
                        {TRANSLATED_YES}
                      </MenuItem>
                      <MenuItem
                        eventKey="2"
                        className="PageConfigPage__on-the-fly-no"
                        onClick={() => setSelectedPageOnTheFly && setSelectedPageOnTheFly(false)}
                      >
                        {TRANSLATED_NO}
                      </MenuItem>
                    </DropdownButton>
                  </div>
                </Col>
              </Row>

              <Panel
                className="PageConfigPage__info-panel"
                id="collapsible-info-table"
                expanded={this.state.infoTableOpen}
                onToggle={() => {}}
              >
                <Panel.Collapse>
                  <SelectedPageInfoTableContainer />
                </Panel.Collapse>
              </Panel>

              <PageConfigGridContainer />
            </Col>
            <Col xs={4} lg={3} xl={2} className="PageConfigPage__side-widget">
              <ToolbarPageConfigContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

PageConfigPage.propTypes = {
  onWillMount: PropTypes.func,
  onWillUnmount: PropTypes.func,
  pageName: PropTypes.string,
  pageStatus: PropTypes.string,
  pageIsOnTheFly: PropTypes.bool,
  pageIsPublished: PropTypes.bool,
  pageDiffersFromPublished: PropTypes.bool,
  isOnTheFlyEnabled: PropTypes.bool,
  pageConfigMatchesDefault: PropTypes.bool,
  setSelectedPageOnTheFly: PropTypes.func,
  restoreConfig: PropTypes.func,
  publishPage: PropTypes.func,
  unpublishPage: PropTypes.func,
  applyDefaultConfig: PropTypes.func,
};

PageConfigPage.defaultProps = {
  onWillMount: null,
  onWillUnmount: null,
  pageName: '',
  pageStatus: PAGE_STATUS_PUBLISHED,
  pageIsOnTheFly: false,
  pageIsPublished: false,
  pageDiffersFromPublished: false,
  isOnTheFlyEnabled: false,
  pageConfigMatchesDefault: false,
  setSelectedPageOnTheFly: null,
  restoreConfig: null,
  publishPage: null,
  unpublishPage: null,
  applyDefaultConfig: null,
};

export default PageConfigPage;
