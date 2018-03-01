import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Breadcrumb, Button, Row, Col } from 'patternfly-react';
import { Table } from 'react-bootstrap';
import { BreadcrumbItem } from 'frontend-common-components';
import FragmentReferenceTable from 'ui/fragments/detail/FragmentReferenceTable';
import PageModelReferenceTable from 'ui/fragments/detail/PageModelReferenceTable';
import WidgetTypeReferenceTable from 'ui/fragments/detail/WidgetTypeReferenceTable';


class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const onEdit = (ev) => {
      ev.preventDefault();
      this.props.handleEdit();
    };

    const body = () => (
      <div>
        <Table bordered >
          <tbody>
            <tr>
              <th className="td-pagetree-width" width="10%">
                <FormattedMessage id="app.code" />
              </th>
              <td>
                {this.props.code}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.widgetType" />
              </th>
              <td>
                {this.props.widgetType.title ? this.props.widgetType.title : ''}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.pluginCode" />
              </th>
              <td >
                {this.props.pluginCode}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          className="pull-right"
          type="button"
          onClick={onEdit}
          bsStyle="primary"
        >
          <FormattedMessage id="app.edit" />
        </Button>
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
        {/* {references(
            this.props.widgetType, ['code', 'title'],
          {
          origin: 'widgetType',
            firstColumn: { width: '50%' },
            secondColumn: { width: '50%', class: 'DetailFragmentPage__table-th' },
            messages: {
          messageId: 'fragment.detail.title.referencedWidgetType',
          referencedTitle: 'fragment.detail.title.referencedWidgetType',
          firstColumn: 'app.title',
          secondColumn: 'app.code',
            },

          },
        )} */}
      </div>
    );

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
              {body()}
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
  widgetType: {},
  fragments: [],
  pageModels: [],
  pluginCode: '',
};
export default DetailFragmentPage;
