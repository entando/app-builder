import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Icon, Grid, Row, Col, Breadcrumb, DropdownButton, MenuItem, Alert, Spinner, Tabs, Tab } from 'patternfly-react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import PageStatusIcon from 'ui/pages/common/PageStatusIcon';
import PageConfigGridContainer from 'ui/pages/config/PageConfigGridContainer';
import ToolbarPageConfigContainer from 'ui/pages/config/ToolbarPageConfigContainer';
import SelectedPageInfoTableContainer from 'ui/pages/common/SelectedPageInfoTableContainer';
import AppTourContainer from 'ui/app-tour/AppTourContainer';
import { APP_TOUR_STARTED } from 'state/app-tour/const';
import { PAGE_STATUS_PUBLISHED, PAGE_STATUS_UNPUBLISHED } from 'state/pages/const';
import PagesEditFormContainer from 'ui/pages/edit/PagesEditFormContainer';

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
  viewPublishedPage: {
    id: 'pageTree.viewPublishedPage',
    defaultMessage: 'View Published Page',
  },
});

class PageConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoTableOpen: false,
      statusChange: null,
      editingSettings: false,
      toolbarCollapsed: false,
    };

    this.removeStatusAlert = this.removeStatusAlert.bind(this);
    this.toggleInfoTable = this.toggleInfoTable.bind(this);
    this.toggleEditingSettings = this.toggleEditingSettings.bind(this);
    this.openLinkPublishedPage = this.openLinkPublishedPage.bind(this);
    this.handleToggleToolbarCollapse = this.handleToggleToolbarCollapse.bind(this);
  }

  componentDidMount() {
    const { onWillMount } = this.props;
    if (onWillMount) onWillMount();
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
  }

  handleToggleToolbarCollapse() {
    const { toolbarCollapsed } = this.state;
    this.setState({ toolbarCollapsed: !toolbarCollapsed });
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

  toggleEditingSettings() {
    this.setState((state) => {
      const { editingSettings } = state;
      if (editingSettings) {
        const { onSettingsCancel } = this.props;
        onSettingsCancel();
      }
      return ({ editingSettings: !editingSettings });
    });
  }

  openLinkPublishedPage() {
    if (this.props.pageStatus !== PAGE_STATUS_UNPUBLISHED) {
      window.open(this.props.publishedPageUri, '_blank');
    }
  }

  renderPageHeader() {
    const {
      pageName, pageStatus, pageDiffersFromPublished,
    } = this.props;

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

    return (
      <div>
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
      </div>
    );
  }

  renderActionBar(tab) {
    const {
      intl, pageDiffersFromPublished, restoreConfig, previewUri, pageStatus,
      onClickSaveSettings, pageSettingsButtonInvalid, pageSettingsButtonSubmitting,
    } = this.props;

    const { editingSettings } = this.state;
    return (
      <Row className="PageConfigPage__toolbar-row PageConfigPage__btn-group--trans">
        <Col xs={12}>
          <ButtonToolbar className="pull-left">
            <Button
              className={[
                        'btn',
                        'btn-primary',
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
            {tab === 'settings' ?
              <React.Fragment>
                <Button
                  className={[
                    'PageConfigPage__btn-icon--right',
                    'btn',
                    editingSettings ? '' : 'btn-primary',
                  ].join(' ')}
                  onClick={this.toggleEditingSettings}
                >
                  <span>
                    <FormattedMessage id={`${editingSettings ? 'app.cancel' : 'app.edit'}`} />
                  </span>
                </Button>
                {
                editingSettings && (
                  <Button
                    className={[
                      'PageConfigPage__btn-icon--right',
                      'btn',
                      'btn-primary',
                    ].join(' ')}
                    onClick={onClickSaveSettings}
                    disabled={pageSettingsButtonInvalid || pageSettingsButtonSubmitting}
                  >
                    <span>
                      <FormattedMessage id="app.save" />
                    </span>
                  </Button>
                )
              }
              </React.Fragment>
            : (
              <div>
                <Button
                  className={[
                  'PageConfigPage__btn-icon--right',
                  'btn',
                  'btn-default',
                ].join(' ')}
                  onClick={restoreConfig}
                  disabled={!pageDiffersFromPublished}
                >
                  <span>
                    <FormattedMessage id="app.restore" />
                    <Icon name="undo" className="PageConfigPage__btn-icon--svg-right" />
                  </span>
                </Button>

                <a
                  href={previewUri}
                  title={intl.formatMessage(msgs.appPreview)}
                  className={[
                          'btn',
                          'btn-primary',
                          'PageConfigPage__btn--addml',
                          'app-tour-step-19',
                        ].join(' ')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage id="app.preview" />
                </a>
                <Button
                  title={intl.formatMessage(msgs.viewPublishedPage)}
                  className={[
                      'btn',
                      pageStatus === PAGE_STATUS_UNPUBLISHED ? 'btn-default' : 'btn-primary',
                      'PageConfigPage__btn--viewPublishedPage',
                    ].join(' ')}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={pageStatus === PAGE_STATUS_UNPUBLISHED}
                  onClick={this.openLinkPublishedPage}
                >
                  <span>
                    <FormattedMessage id="pageTree.viewPublishedPage" />
                  </span>
                </Button>
              </div>
            ) }
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      intl, pageIsOnTheFly, isOnTheFlyEnabled,
      setSelectedPageOnTheFly, pageIsPublished, publishPage, unpublishPage,
      applyDefaultConfig, pageConfigMatchesDefault, appTourProgress,
      match,
    } = this.props;
    const { editingSettings, toolbarCollapsed } = this.state;

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

    return (
      <InternalPage className="PageConfigPage app-tour-step-12 app-tour-step-14 app-tour-step-15">
        <Grid fluid {...(toolbarCollapsed ? { className: 'PageConfigPage__side-widget--collapsed' } : {})}>
          <Row>
            <Col
              className="PageConfigPage__main"
              xs={toolbarCollapsed ? 12 : 8}
              lg={toolbarCollapsed ? 12 : 9}
            >
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.pageDesigner" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.pageConfig" />
                </BreadcrumbItem>
              </Breadcrumb>

              <Tabs id="basic-tabs" defaultActiveKey={1} className="PageConfigPage__tabs">
                <Tab eventKey={1} title={<FormattedMessage id="pages.designer.tabDesigner" />} >
                  <div>
                    {this.renderPageHeader()}
                    {this.renderActionBar()}
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
                  </div>
                </Tab>
                <Tab eventKey={2} title={<FormattedMessage id="pages.designer.tabPageSettings" />}>
                  <div>
                    {this.renderPageHeader()}
                    {this.renderActionBar('settings')}
                    <PagesEditFormContainer
                      key={(match.params || {}).pageCode}
                      readOnly={!editingSettings}
                      stayOnSave
                      onSave={this.toggleEditingSettings}
                    />
                  </div>
                </Tab>
              </Tabs>


              <Row className="PageConfigPage__toolbar-row PageConfigPage__bottom-options">
                <Col
                  xs={toolbarCollapsed ? 12 : 8}
                  lg={toolbarCollapsed ? 12 : 9}
                  className="PageConfigPage__bottom-options--tbar"
                >
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
                      className="PageConfigPage__publish-btn btn-primary app-tour-step-20"
                      bsStyle="success"
                      onClick={() => publishPage(appTourProgress === APP_TOUR_STARTED)}
                      disabled={pageIsPublished}
                    >
                      <FormattedMessage id="app.publish" />
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col
              xs={toolbarCollapsed ? 0 : 4}
              lg={toolbarCollapsed ? 0 : 3}
              className="PageConfigPage__side-widget"
            >
              <ToolbarPageConfigContainer
                fixedView
                collapsed={toolbarCollapsed}
                onToggleCollapse={this.handleToggleToolbarCollapse}
              />
            </Col>
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
  publishedPageUri: PropTypes.string,
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
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }).isRequired,
  loading: PropTypes.bool,
  appTourProgress: PropTypes.string,
  onSettingsCancel: PropTypes.func.isRequired,
  onClickSaveSettings: PropTypes.func.isRequired,
  pageSettingsButtonSubmitting: PropTypes.bool,
  pageSettingsButtonInvalid: PropTypes.bool,
};

PageConfigPage.defaultProps = {
  previewUri: '',
  publishedPageUri: '',
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
  loading: false,
  appTourProgress: '',
  pageSettingsButtonSubmitting: false,
  pageSettingsButtonInvalid: false,
};

export default injectIntl(PageConfigPage);
