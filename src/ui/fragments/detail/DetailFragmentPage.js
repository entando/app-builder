import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Breadcrumb, Row, Col } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import DetailFragmentTable from 'ui/fragments/detail/DetailFragmentTable';
import FragmentReferenceTable from 'ui/fragments/detail/FragmentReferenceTable';
import PageModelReferenceTable from 'ui/fragments/detail/PageModelReferenceTable';
import WidgetTypeReferenceTable from 'ui/fragments/detail/WidgetTypeReferenceTable';


class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    return (
      <InternalPage className="DetailFragmentPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem route="home" active>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                <BreadcrumbItem route="home">
                  <FormattedMessage id="menu.uxPattern.fragment" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="fragment.detail.title" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <PageTitle
            titleId="fragment.detail.title"
            helpId="fragment.detail.help"
          />
          <Row>
            <Col xs={12}>
              <DetailFragmentTable
                handleEdit={this.props.handleEdit}
                code={this.props.code}
                title={this.props.widgetType.title}
                pluginCode={this.props.pluginCode}
              />
              <br />
              <hr />
              <Row>
                <p className="col-xs-12" >
                  <FormattedMessage id="fragment.detail.title.referencedFragments" />
                </p>
                <Col xs={12} className="no-padding">
                  <FragmentReferenceTable
                    fragments={this.props.fragments}
                    referencesFragments={this.props.referencesFragments}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <p className="col-xs-12" >
                  <FormattedMessage id="fragment.detail.title.referencedPageModels" />
                </p>
                <Col xs={12} className="no-padding">
                  <PageModelReferenceTable
                    pageModel={this.props.pageModels}
                    referencesPageModels={this.props.referencesPageModels}
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
                    widgetType={this.props.widgetType}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

DetailFragmentPage.propTypes = {
  onWillMount: PropTypes.func,
  handleEdit: PropTypes.func,
  referencesFragments: PropTypes.func,
  referencesPageModels: PropTypes.func,
  code: PropTypes.string,
  fragments: PropTypes.arrayOf(PropTypes.shape({})),
  pageModels: PropTypes.arrayOf(PropTypes.shape({})),
  widgetType: PropTypes.shape({ title: PropTypes.string }),
  pluginCode: PropTypes.string,
};

DetailFragmentPage.defaultProps = {
  onWillMount: () => {},
  handleEdit: () => {},
  referencesFragments: () => {},
  referencesPageModels: () => {},
  code: '',
  widgetType: { title: '' },
  fragments: [],
  pageModels: [],
  pluginCode: '',
};
export default DetailFragmentPage;
