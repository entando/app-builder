import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { FormattedMessage } from 'react-intl';
import { Grid, Breadcrumb, Button, Row, Col, DropdownKebab, MenuItem } from 'patternfly-react';
import { Table } from 'react-bootstrap';
import { BreadcrumbItem } from 'frontend-common-components';
import EmptyData from 'ui/fragments/detail/EmptyData';
import FragmentReferenceTable from 'ui/fragments/detail/FragmentReferenceTable';
import PageModelReferenceTable from 'ui/fragments/detail/PageModelReferenceTable';


class DetailFragmentPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const onEdit = (ev) => {
      ev.preventDefault();
      this.props.handleEdit();
    };

    const onEditReferenced = (item, origin) => (ev) => {
      ev.preventDefault();
      switch (origin) {
        case 'fragments':
          this.props.referencesFragments(item);
          break;
        case 'pageModels':
          this.props.referencesPageModels(item);
          break;
        default: break;
      }
    };


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

    const row = (item, keys, origin) => (
      <tr key={item[keys[0]]} >
        {keys.map(key => (
          key !== 'actions' ? <td key={key}>{item[key]} </td> :
          <td key={key} className="text-center">
            <DropdownKebab key={key} id={key}>
              <MenuItem
                onClick={onEditReferenced(item, origin)}
              ><FormattedMessage id="app.edit" />
              </MenuItem>
            </DropdownKebab>
          </td>
        ))}
      </tr>
    );

    const redenderTableRow = (obj, keys, origin) => {
      if (Array.isArray(obj)) {
        return obj.map(item => (
          row(item, keys, origin)
        ));
      }
      return row(obj, keys, origin);
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
                    className="DetailFragmentPage__table-th"
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
                      width={meta.thirdColumn.width}
                      className={meta.thirdColumn.class}
                    >
                      <FormattedMessage id={meta.messages.thirdColumn} />
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                {redenderTableRow(obj, keys, meta.origin)}
              </tbody>
            </Table>
          </Col>
        </Row>
        {renderSearch(obj.length)}
      </div>
    );

    const references = (obj, keys, meta) => (

      obj.length === 0 || Object.keys(obj).length === 0 ?
        <EmptyData messageId={meta.messages.messageId} /> :
        renderDetailData(obj, keys, meta)
    );

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
        {/* {references(
            this.props.pageModels, ['code', 'name', 'actions'],
          {
          origin: 'pageModels',
            firstColumn: { width: '70%' },
            secondColumn: { width: '25%', class: 'DetailFragmentPage__table-th' },
            thirdColumn: { class: 'DetailFragmentPage__th-actions' },
            messages: {
          messageId: 'fragment.detail.emptyReferencePageModels',
          referencedTitle: 'fragment.detail.title.referencedPageModels',
          firstColumn: 'app.code',
          secondColumn: 'app.name',
          thirdColumn: 'app.actions',
          },

            },
        )} */}
        <hr />
        {references(
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
        )}
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
