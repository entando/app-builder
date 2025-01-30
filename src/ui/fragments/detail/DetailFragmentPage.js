import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col } from 'patternfly-react';

import PageTitle from 'ui/internal-page/PageTitle';
import InternalPage from 'ui/internal-page/InternalPage';
import DetailFragmentTable from 'ui/fragments/detail/DetailFragmentTable';
import FragmentReferenceTable from 'ui/fragments/detail/FragmentReferenceTable';
import PageTemplateReferenceTable from 'ui/fragments/detail/PageTemplateReferenceTable';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import WidgetTypeReferenceTable from 'ui/fragments/detail/WidgetTypeReferenceTable';
import { ROUTE_FRAGMENT_LIST } from 'app-init/router';

class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    return (
      <InternalPage className="DetailFragmentPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.fragments', to: ROUTE_FRAGMENT_LIST },
          { label: 'fragment.detail.title', active: true },
        ]}
        />
        <Grid fluid>
          <PageTitle
            titleId="fragment.detail.title"
            helpId="fragment.help"
          />
          <Col xs={12}>
            <Row>
              <DetailFragmentTable
                handleEdit={this.props.handleEdit}
                code={this.props.fragment && this.props.fragment.code}
                title={this.props.fragment.widgetType && this.props.fragment.widgetType.title}
                pluginCode={this.props.fragment.pluginCode}
              />
            </Row>
            <Row>
              <p className="col-xs-12" >
                <FormattedMessage id="fragment.detail.title.referencedFragments" />
              </p>
              <Col xs={12} className="no-padding">
                <FragmentReferenceTable
                  fragments={this.props.fragment.fragments}
                  referencesFragments={this.props.referencesFragments}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <p className="col-xs-12" >
                <FormattedMessage id="fragment.detail.title.referencedPageTemplates" />
              </p>
              <Col xs={12} className="no-padding">
                <PageTemplateReferenceTable
                  pageTemplate={this.props.fragment.pageModels}
                  referencesPageTemplates={this.props.referencesPageTemplates}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <p className="col-xs-12" >
                <FormattedMessage id="fragment.detail.title.referencedWidgetType" />
              </p>
              <Col xs={12} className="no-padding">
                <WidgetTypeReferenceTable
                  widgetType={this.props.fragment.widgetType}
                />
              </Col>
            </Row>
          </Col>
        </Grid>
      </InternalPage>
    );
  }
}

DetailFragmentPage.propTypes = {
  onWillMount: PropTypes.func,
  handleEdit: PropTypes.func,
  referencesFragments: PropTypes.func,
  referencesPageTemplates: PropTypes.func,
  fragment: PropTypes.shape({
    code: PropTypes.string,
    pluginCode: PropTypes.string,
    fragments: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
    })),
    pageModels: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
    })),
    widgetType: PropTypes.oneOfType([
      PropTypes.shape({ title: PropTypes.string }),
    ]),
  }).isRequired,
};

DetailFragmentPage.defaultProps = {
  onWillMount: () => {},
  handleEdit: () => {},
  referencesFragments: () => {},
  referencesPageTemplates: () => {},
};
export default DetailFragmentPage;
