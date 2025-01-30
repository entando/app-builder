import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InternalPage from 'ui/internal-page/InternalPage';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
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
      <InternalPage className="CloneWidgetPage WidgetPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.uxComponents.widget', to: ROUTE_WIDGET_LIST },
          { label: 'menu.widgetClone' },
          { customLabel: this.props.widgetName, active: true },

        ]}
        />
        <div className="WidgetPage__header">
          <PageTitle titleId="widget.page.clone.pageTitle" helpId="widget.help">
            <div id="widget-button-holder" className="WidgetPage__header__btn-container" />
          </PageTitle>
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
