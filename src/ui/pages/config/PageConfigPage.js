import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Icon, Grid, Row, Col, Breadcrumb, DropdownButton, MenuItem, Alert, Spinner } from 'patternfly-react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import throttle from 'lodash/throttle';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import PageConfigGridContainer from 'ui/pages/config/PageConfigGridContainer';
import ToolbarPageConfigContainer from 'ui/pages/config/ToolbarPageConfigContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import { PAGE_STATUS_PUBLISHED } from 'state/pages/const';
import SinglePageSettingsModalContainer from 'ui/pages/config/SinglePageSettingsModalContainer';
import AppTourContainer from 'ui/dashboard/AppTourContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';

const msgs = defineMessages({
  appYes: {
    id: 'app.yes',
    defaultMessage: 'Yes',
  },
  appNo: {
    id: 'app.no',
    defaultMessage: 'No',
  },
  appPreview: {
    id: 'app.preview',
    defaultMessage: 'Preview',
  },
});

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
            let widgetSize = {};
            if ('getBoundingClientRect' in sideWidget) {
              widgetSize = sideWidget.getBoundingClientRect();
              const { height } = widgetSize;
              widgetSize = { height: `${height + 80}px` };
            }
            this.setState({ widgetSize, sticky: true });
          }
        } else if (this.state.sticky) {
          this.setState({ sticky: false });
        }
      }
    }, 200);
  }

  componentWillMount() {
    const { onWillMount } = this.props;
    if (onWillMount) onWillMount();
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
    const { match, onWillMount } = this.props;
    const { params: nextMatchParams } = nextProps.match;
    const { params: currMatchParams } = match;
    if (nextMatchParams.pageCode !== currMatchParams.pageCode) {
      onWillMount(nextMatchParams.pageCode);
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
      intl, pageName, pageStatus, pageDiffersFromPublished, pageIsOnTheFly, isOnTheFlyEnabled,
      setSelectedPageOnTheFly, pageIsPublished, restoreConfig, publishPage, unpublishPage,
      applyDefaultConfig, pageConfigMatchesDefault, previewUri, showPageSettings, appTourProgress,
    } = this.props;

    const TRANSLATED_YES = intl.formatMessage(msgs.appYes);
    const TRANSLATED_NO = intl.formatMessage(msgs.appNo);

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
      <InternalPage className="PageConfigPage app-tour-step-12">
        <Grid fluid>
          <Row>
            <Col className="PageConfigPage__main" xs={8} lg={9}>
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

              <Row className="PageConfigPage__toolbar-row PageConfigPage__btn-group--trans">
                <Col xs={12}>
                  <ButtonToolbar className="pull-left">
                    <Button
                      className={[
                        'btn-transparent',
                        'PageConfigPage__info-btn',
                        'PageConfigPage__btn-icon',
                      ].join(' ')}
                      bsStyle="default"
                      onClick={this.toggleInfoTable}
                    >
                      <span>
                        <Icon
                          name={this.state.infoTableOpen ? 'angle-down' : 'angle-right'}
                          className="PageConfigPage__btn-icon--svg"
                        />
                        <FormattedMessage id="app.info" />
                      </span>
                    </Button>
                  </ButtonToolbar>
                  <ButtonToolbar className="pull-right">
                    <a
                      href={previewUri}
                      title={intl.formatMessage(msgs.appPreview)}
                      className={[
                        'btn',
                        'btn-default',
                        'btn-transparent',
                        'PageConfigPage__btn--addml',
                        'app-tour-step-14',
                      ].join(' ')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormattedMessage id="app.preview" />
                    </a>
                    <Button
                      className={[
                        'PageConfigPage__btn-icon--right',
                        'btn-transparent',
                      ].join(' ')}
                      onClick={restoreConfig}
                      disabled={!pageDiffersFromPublished}
                    >
                      <span>
                        <FormattedMessage id="app.restore" />
                        <Icon
                          name="undo"
                          className="PageConfigPage__btn-icon--svg-right"
                        />
                      </span>
                    </Button>
                    <Button
                      className={[
                        'PageConfigPage__btn-icon--right',
                        'btn-transparent',
                      ].join(' ')}
                      bsStyle="default"
                      onClick={showPageSettings}
                    >
                      <span>
                        <FormattedMessage id="pageSettings.title" />
                        <Icon
                          name="cogs"
                          className="PageConfigPage__btn-icon--svg-right"
                        />
                      </span>
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="PageConfigPage__toolbar-row PageConfigPage__bottom-options">
                <Col xs={8} lg={9} className="PageConfigPage__bottom-options--tbar">
                  <ButtonToolbar className="pull-left">
                    { defaultConfigBtn }
                  </ButtonToolbar>
                  <div className="pull-right PageConfigPage__publishing">
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
                    <Button
                      className="PageConfigPage__unpublish-btn"
                      bsStyle="default"
                      onClick={unpublishPage}
                      disabled={!pageIsPublished}
                    >
                      <FormattedMessage id="app.unpublish" />
                    </Button>
                    <Button
                      className="PageConfigPage__publish-btn btn-primary app-tour-step-13"
                      bsStyle="success"
                      onClick={() => publishPage(appTourProgress === APP_TOUR_STARTED)}
                      disabled={pageIsPublished}
                    >
                      <FormattedMessage id="app.publish" />
                    </Button>
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
              <Spinner loading={!!this.props.loading}>
                <PageConfigGridContainer />
              </Spinner>
            </Col>
            <Col
              xs={4}
              lg={3}
              className={sideWidgetClassAr.join(' ')}
              ref={(el) => { this.sideWidget = el; }}
            >
              <ToolbarPageConfigContainer fixedView={this.state.sticky} />
              <SinglePageSettingsModalContainer />
            </Col>
            { !this.state.sticky ? null : (
              <Col
                xs={4}
                lg={3}
                style={this.state.widgetSize}
              />
            )}
          </Row>
          <AppTourContainer lockBodyScroll={false} />
        </Grid>
      </InternalPage>
    );
  }
}

PageConfigPage.propTypes = {
  intl: intlShape.isRequired,
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
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
  loading: PropTypes.bool,
  appTourProgress: PropTypes.string,
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
  loading: false,
  appTourProgress: '',
};

export default injectIntl(PageConfigPage);
