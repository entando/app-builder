import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { routeConverter } from '@entando/utils';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import MonolistAttributeFormContainer from 'ui/data-types/attributes/monolist/MonolistAttributeFormContainer';
import {
  ROUTE_DATA_TYPE_LIST,
  ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
} from 'app-init/router';

import { TYPE_COMPOSITE, TYPE_MONOLIST } from 'state/data-types/const';

class MonolistPage extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      attributeCode, dataTypeCode, selectedAttribute, entityCode, type,
    } = this.props;
    const titleId = selectedAttribute === '' ? 'app.edit' : `app.edit.${selectedAttribute}`;
    return (
      <InternalPage className="MonolistPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.data" />
                </BreadcrumbItem>
                <BreadcrumbItem to={ROUTE_DATA_TYPE_LIST}>
                  <FormattedMessage id="menu.dataType" />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <FormattedMessage id="app.edit" /> :
                  &nbsp;{dataTypeCode}
                </BreadcrumbItem>
                {
                  type === TYPE_COMPOSITE ?
                    <BreadcrumbItem>
                      <FormattedMessage id="app.edit.attribute" />
                      {attributeCode}
                    </BreadcrumbItem> :
                    <BreadcrumbItem
                      to={routeConverter(
                        ROUTE_DATA_TYPE_ATTRIBUTE_EDIT,
                        { entityCode, attributeCode },
                      )}
                    >
                      <FormattedMessage id="app.edit.attribute" />
                      {attributeCode}
                    </BreadcrumbItem>
                }
                <BreadcrumbItem active>
                  {type === TYPE_COMPOSITE ? TYPE_MONOLIST : selectedAttribute}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <PageTitle
            titleId={titleId}
            helpId="dataType.help"
          />
          <Row>
            <Col xs={12} >
              <MonolistAttributeFormContainer />
            </Col>
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

MonolistPage.propTypes = {
  onWillMount: PropTypes.func,
  dataTypeCode: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttribute: PropTypes.string,
  entityCode: PropTypes.string,
  type: PropTypes.string,

};

MonolistPage.defaultProps = {
  onWillMount: () => {},
  dataTypeCode: '',
  attributeCode: '',
  selectedAttribute: '',
  entityCode: '',
  type: '',
};


export default MonolistPage;
