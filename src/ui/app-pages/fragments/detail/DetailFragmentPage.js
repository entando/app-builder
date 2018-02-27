import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Breadcrumb, Button, Alert, Row, Col, DropdownKebab, MenuItem } from 'patternfly-react';
import { Table } from 'react-bootstrap';
import { BreadcrumbItem } from 'frontend-common-components';


class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }


  render() {
    const onEdit = (ev) => {
      ev.preventDefault();
      this.props.handleEdit();
    };

    const onEditReferencedFragments = (ev) => {
      ev.preventDefault();
    };

    const renderEmptyData = messageId => (
      <Alert type="info">
        <strong>
          <FormattedMessage id={messageId} />
        </strong>
      </Alert>);

    const renderSearch = value => (
      value > 0 ?
        <Row>
          <Col xs={12} className="no-padding">
            <div className="DetailFragmentPage__div-search content-view-pf-pagination clearfix">
              <div className="form-group">
                <span>
                  <FormattedMessage id="app.search.returned" values={{ value }} />
                </span>
              </div>
            </div>
          </Col>
        </Row> : null
    );

    const row = (item, keys) => (
      <tr key={item[keys[0]]} >
        {keys.map(key => (
          key !== 'actions' ? <td key={key}>{item[key]} </td> :
          <td key={key} className="text-center">
            <DropdownKebab key={key} id={key}>
              <MenuItem
                onClick={onEditReferencedFragments}
              ><FormattedMessage id="app.edit" />
              </MenuItem>
            </DropdownKebab>
          </td>
        ))}
      </tr>
    );


    const redenderTableRow = (obj, keys) => {
      if (Array.isArray(obj)) {
        return obj.map(item => (
          row(item, keys)
        ));
      }
      console.log(obj[keys[0]]);
      return row(obj, keys);
    };

    const renderDetailData = (obj, keys, meta) => (
      <div>
        <Row>
          <p className="col-xs-12" >
            <FormattedMessage id={meta.messages.referencedTitle} />
          </p>
          <Col xs={12} className="no-padding">
            <Table bordered hover className="DetailFragmentPage__table">
              <thead>
                <tr>
                  <th
                    width={meta.firstColumn.width}
                  >
                    <FormattedMessage id={meta.messages.firstColumn} />
                  </th>
                  <th
                    width={meta.secondColumn.width}
                    className={meta.secondColumn.class}
                  >
                    <FormattedMessage id={meta.messages.secondColumn} />
                  </th>
                  { meta.thirdColumn &&
                    <th
                      width={meta.secondColumn.width}
                      className={meta.secondColumn.class}
                    >
                      <FormattedMessage id={meta.messages.secondColumn} />
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                {redenderTableRow(obj, keys)}
              </tbody>
            </Table>
          </Col>
        </Row>
        {renderSearch(obj.length)}
      </div>
    );

    const references = (obj, keys, meta) => (
      !obj ? renderEmptyData(meta.messages.messageId) : renderDetailData(obj, keys, meta)
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
                {this.props.code}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.widgetType" />
              </th>
              <td>
                {this.props.widgetType.title}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.pluginCode" />
              </th>
              <td >
                {this.props.plugin.code ? this.props.plugin.code : ''}
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
        {references(
          this.props.fragments, ['code', 'actions'],
          {
            firstColumn: { width: '95%' },
            secondColumn: { width: '5%', class: 'DetailFragmentPage__th-actions' },
            messages: {
              messageId: 'fragment.detail.emptyReferenceFragments',
              referencedTitle: 'fragment.detail.title.referencedFragments',
              firstColumn: 'fragment.detail.table.column.widgetName',
              secondColumn: 'app.actions',
            },
          },
        )}
        <hr />
        {references(
          this.props.pageModels, ['code', 'name', 'actions'],
          {
            firstColumn: { width: '70%' },
            secondColumn: { width: '30%' },
            thirdColumn: { width: '5%', class: 'DetailFragmentPage__th-actions' },
            messages: {
              messageId: 'fragment.detail.emptyReferencePageModels',
              referencedTitle: 'fragment.detail.title.referencedFragments',
              firstColumn: 'fragment.detail.table.column.widgetName',
              secondColumn: 'app.actions',
            },

          },
        )}
        <hr />
        {references(
          this.props.widgetType, ['code', 'title'],
          {
            firstColumn: { width: '50%' },
            secondColumn: { width: '50%' },
            messages: {
              messageId: 'fragment.detail.title.referencedWidgetType',
              referencedTitle: 'fragment.detail.title.referencedWidgetType',
              firstColumn: 'fragment.title',
              secondColumn: 'fragment.code',
            },

          },
        )}
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
  code: PropTypes.string,
  widgetName: PropTypes.string,
  fragments: PropTypes.arrayOf(PropTypes.shape({})),
  widgetType: PropTypes.shape({}),
  plugin: PropTypes.shape({}),
};

DetailFragmentPage.defaultProps = {
  onWillMount: () => {},
  handleEdit: () => {},
  code: 'myCode',
  widgetName: '',
  fragments: [{
    code: 'fragmentCode',
  }],
  widgetType: {
    code: 'widgetCode',
    title: 'Widget Title',
  },
  plugin: {},
};
export default DetailFragmentPage;
