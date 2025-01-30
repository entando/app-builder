import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import EditWidgetFormContainer from 'ui/widgets/edit/EditWidgetFormContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

class EditWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="EditWidgetPage WidgetPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.widgets', to: ROUTE_WIDGET_LIST },
          { label: 'menu.widgetEdit' },
          { customLabel: this.props.widgetName, active: true },
          ]}
        />
        <div className="WidgetPage__header">
          <PageTitle titleId="widget.page.edit.pageTitle" helpId="widget.help">
            <div id="widget-button-holder" />
          </PageTitle>
        </div>
        <div className="WidgetPage__body">
          <EditWidgetFormContainer />
        </div>
      </InternalPage>
    );
  }
}

EditWidgetPage.propTypes = {
  onWillMount: PropTypes.func,
  widgetName: PropTypes.string,
};

EditWidgetPage.defaultProps = {
  onWillMount: () => {},
  widgetName: '',
};

export default EditWidgetPage;
