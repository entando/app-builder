import React, { Component } from 'react';
import InternalPage from 'ui/internal-page/InternalPage';
import { Breadcrumb, OverlayTrigger, Popover, Grid } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import WidgetEditFormContainer from 'ui/widgets/WidgetEditFormContainer';
import PropTypes from 'prop-types';

const WIDGET_EDIT_HELP = 'widget.page.edit.help';

const popover = () => (
  <Popover id="popover-admin-app-switch" title="">
    <p>
      <FormattedMessage id={WIDGET_EDIT_HELP} />
    </p>
  </Popover>
);

class WidgetEditPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="WidgetEditPage">
        <Grid fluid>
          <Breadcrumb>
            <BreadcrumbItem route="home">
              <FormattedMessage id="menu.uxPattern" />
            </BreadcrumbItem>
            <BreadcrumbItem route="home">
              <FormattedMessage id="menu.widgets" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="menu.widgetEdit" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {this.props.widgetName}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="WidgetEditPage__header">
            <h1>
              <span><FormattedMessage id="widget.page.edit.pageTitle" /></span>
              <span className="pull-right">
                <OverlayTrigger
                  overlay={popover()}
                  placement="left"
                  trigger={['click']}
                  rootClose
                >
                  <i className="WidgetListPage__icon fa pficon-help" />
                </OverlayTrigger>
              </span>
            </h1>
          </div>
          <WidgetEditFormContainer />
        </Grid>
      </InternalPage>
    );
  }
}

WidgetEditPage.propTypes = {
  onWillMount: PropTypes.func,
  widgetName: PropTypes.string,
};

WidgetEditPage.defaultProps = {
  onWillMount: () => {},
  widgetName: '',
};

export default WidgetEditPage;
