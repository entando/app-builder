import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon, Grid, Row, Col, Breadcrumb, DropdownButton, MenuItem, Alert } from 'patternfly-react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import throttle from 'lodash/throttle';
import { formattedText } from '@entando/utils';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import PageConfigGridContainer from 'ui/pages/config/PageConfigGridContainer';
import ToolbarPageConfigContainer from 'ui/pages/config/ToolbarPageConfigContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { PAGE_STATUS_PUBLISHED } from 'state/pages/const';
import PageSettingsModalContainer from './SinglePageSettingsModalContainer';

const TRANSLATED_YES = formattedText('app.yes');
const TRANSLATED_NO = formattedText('app.no');

class PageConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoTableOpen: false,
      statusChange: null,
    };

    this.removeStatusAlert = this.removeStatusAlert.bind(this);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);

    this.winScrollListener = throttle(() => {
      const sideWidget = document.querySelector('.PageConfigPage__side-widget');
      if (sideWidget) {
        const parentOffsetTop = sideWidget.parentElement.offsetTop;
        const windowScrollTop = window.scrollY;
        if (windowScrollTop > parentOffsetTop) {
          if (!this.state.sticky) {
            this.setState({ sticky: true });
          }
        } else if (this.state.sticky) {
          this.setState({ sticky: false });
        }
      }
    }, 200);
  }

  componentWillMount() {
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.winScrollListener);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageStatus !== 'draft') {
      this.setState({
        statusChange: (nextProps.pageStatus !== this.props.pageStatus) ?
          nextProps.pageStatus :
          null,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.onWillUnmount) this.props.onWillUnmount(this.props);
    window.removeEventListener('scroll', this.winScrollListener);
  }

  removeStatusAlert() {
    this.setState({
      statusChange: null,
    });
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
      applyDefaultConfig, pageConfigMatchesDefault, previewUri, showPageSettings,
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

    const statusMessage = this.state.statusChange ?
      (
        <Alert type="info" onDismiss={this.removeStatusAlert}>
          <FormattedMessage
            id={`pageSettings.status.${this.state.statusChange}`}
            values={{ page: pageName }}
          />
        </Alert>
      ) :
      null;

    const sideWidgetClassAr = ['PageConfigPage__side-widget'];
    if (this.state.sticky) {
      sideWidgetClassAr.push('PageConfigPage__side-widget--sticky');
    }

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <InternalPage className="PageConfigPage">
          <Grid fluid>
            <Row>
              <Col xs={8} lg={9}>
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

                <Row>
                  <Col xs={12}>
                    {statusMessage}
                  </Col>
                </Row>

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
                      <a
                        href={previewUri}
                        title={formattedText('app.preview', 'Preview')}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FormattedMessage id="app.preview" />
                      </a>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                      <Button
                        className="PageConfigPage__settings-btn"
                        bsStyle="default"
                        onClick={showPageSettings}
                      >
                        <span><FormattedMessage id="pageSettings.title" /><Icon name="cogs" /></span>
                      </Button>
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
              <Col
                xs={4}
                lg={3}
                className={sideWidgetClassAr.join(' ')}
                ref={(el) => { this.sideWidget = el; }}
              >
                <ToolbarPageConfigContainer />
                <PageSettingsModalContainer />
              </Col>
            </Row>
          </Grid>
        </InternalPage>
      </DragDropContextProvider>
    );
  }
}

PageConfigPage.propTypes = {
  previewUri: PropTypes.string,
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
  showPageSettings: PropTypes.func,
};

PageConfigPage.defaultProps = {
  previewUri: '',
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
  showPageSettings: null,
};

export default PageConfigPage;
