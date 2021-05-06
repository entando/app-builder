import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import CloneWidgetFormContainer from 'ui/widgets/clone/CloneWidgetFormContainer';
import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

class CloneWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="AddWidgetPage WidgetPage">
        <div className="WidgetPage__header">
          <div className="WidgetPage__top">
            <div>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_WIDGET_LIST}>
                  <FormattedMessage id="menu.uxComponents.widget" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.widgetClone" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {this.props.widgetName}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
            <div>
              <div id="widget-button-holder" />
            </div>
          </div>
          <div>
            <PageTitle titleId="widget.page.clone.pageTitle" helpId="widget.help" />
          </div>
        </div>

        <div className="WidgetPage__body">
          <ErrorsAlertContainer />
          <CloneWidgetFormContainer />
        </div>
      </InternalPage>
    );
  }
}

CloneWidgetPage.propTypes = {
  onWillMount: PropTypes.func,
  widgetName: PropTypes.string,
};

CloneWidgetPage.defaultProps = {
  onWillMount: () => {},
  widgetName: '',
};

export default CloneWidgetPage;
