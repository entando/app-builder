import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { routeConverter } from '@entando/utils';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import CMSPageTitle from 'ui/common/CMSPageTitle';
import MonolistAttributeFormContainer from 'ui/content-type/attributes/monolist/MonolistAttributeFormContainer';
import { ROUTE_CMS_CONTENTTYPE_LIST, ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT } from 'app-init/router';

import { TYPE_COMPOSITE, TYPE_MONOLIST } from 'state/content-type/const';

class MonolistPage extends Component {
  componentDidMount() {
    const { onDidMount, ...otherProps } = this.props;
    onDidMount(otherProps);
  }

  render() {
    const {
      attributeCode, contentTypeCode, selectedAttribute, entityCode, type,
    } = this.props;
    const titleId = selectedAttribute === ''
      ? 'cms.label.edit'
      : `cms.contenttype.label.edit.${selectedAttribute}`;

    const nextBreadCrumbs = type === TYPE_COMPOSITE ? (
      <BreadcrumbItem>
        <FormattedMessage id="cms.contenttype.label.edit.attribute" />
        {attributeCode}
      </BreadcrumbItem>
    ) : (
      <BreadcrumbItem
        to={routeConverter(ROUTE_CMS_CONTENT_TYPE_ATTRIBUTE_EDIT, { entityCode, attributeCode })}
      >
        <FormattedMessage id="cms.contenttype.label.edit.attribute" />
        {attributeCode}
      </BreadcrumbItem>
    );

    const lastBreadcrumbLabel = type === TYPE_COMPOSITE ? TYPE_MONOLIST : selectedAttribute;

    return (
      <InternalPage>
        <Grid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="cms.title" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_CMS_CONTENTTYPE_LIST}>
                  <FormattedMessage id="cms.menu.contenttypes" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="cms.label.edit" />: &nbsp;{contentTypeCode}
                </BreadcrumbItem>
                {nextBreadCrumbs}
                <BreadcrumbItem active>{lastBreadcrumbLabel}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <CMSPageTitle
                titleId={titleId}
                helpId="cms.contentType.helpattributes.label"
                position="pull-right"
                largeTitle
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <MonolistAttributeFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

MonolistPage.propTypes = {
  onDidMount: PropTypes.func,
  contentTypeCode: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttribute: PropTypes.string,
  entityCode: PropTypes.string,
  type: PropTypes.string,
};

MonolistPage.defaultProps = {
  onDidMount: () => {},
  contentTypeCode: '',
  attributeCode: '',
  selectedAttribute: '',
  entityCode: '',
  type: '',
};

export default MonolistPage;
