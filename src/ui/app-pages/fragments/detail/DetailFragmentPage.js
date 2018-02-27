import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Breadcrumb, Button, Alert, Row, Col } from 'patternfly-react';
import { Table } from 'react-bootstrap';
import { formattedText, BreadcrumbItem } from 'frontend-common-components';


class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }


  render() {
    const renderEmptyData = messageId => (
      <Alert type="info">
        <strong>
          <FormattedMessage id={messageId} />
        </strong>
      </Alert>);

    const onEdit = (ev) => {
      ev.preventDefault();
      this.props.handleEdit();
    };

    const references = (value, messageId) => (
      !value ? renderEmptyData(messageId) : <span />
    );

    const body = () => (
      <div className="DetailFragmentPage">
        <Table bordered >
          <tbody>
            <tr>
              <th className="td-pagetree-width" width="10%">
                <FormattedMessage id="fragment.detail.widgetName" />
              </th>
              <td>
                {this.props.widgetName}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.widgetType" />
              </th>
              <td>
                {this.props.widgetType}
              </td>
            </tr>
            <tr>
              <th>FragmentDetail
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
        {references(this.props.fragments, 'fragment.detail.emptyReferenceFragments')}
        <hr />
        {references(this.props.pageModels, 'fragment.detail.emptyReferencepageModels')}
        <hr />
      </div>
    );

    return (

      <InternalPage>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem route="home" active>
                  <FormattedMessage id="menu.uxPattern" />
                </BreadcrumbItem>
                <BreadcrumbItem route="fragmentDetail">
                  <FormattedMessage id="menu.uxPattern.fragment" />
                </BreadcrumbItem>
                <BreadcrumbItem route="fragmentDetail" active>
                  <FormattedMessage id="fragment.detail.title" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <PageTitle
            title={formattedText('fragment.detail.title')}
            helpMessage={formattedText('fragment.detail.help')}
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
  widgetName: PropTypes.string,
  widgetType: PropTypes.string,
  pluginCode: PropTypes.string,
};

DetailFragmentPage.defaultProps = {
  onWillMount: () => {},
  handleEdit: () => {},
  widgetName: '',
  widgetType: '',
  pluginCode: '',
};
export default DetailFragmentPage;
