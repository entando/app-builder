import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'patternfly-react';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import EditWidgetFormContainer from 'ui/widgets/edit/EditWidgetFormContainer';
import { ROUTE_WIDGET_LIST } from 'app-init/router';

class EditWidgetPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    return (
      <InternalPage className="EditWidgetPage WidgetPage">
        <div className="WidgetPage__header">
          <div className="WidgetPage__top">
            <div>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_WIDGET_LIST}>
                  <FormattedMessage id="menu.widgets" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.widgetEdit" />
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
            <PageTitle titleId="widget.page.edit.pageTitle" helpId="widget.help" />
          </div>
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
