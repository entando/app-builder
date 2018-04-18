import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { BreadcrumbItem } from 'frontend-common-components';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import { ROUTE_DATA_TYPE_LIST } from 'app-init/router';
import DataAttributeBooleanFormContainer from 'ui/data-types/common/DataAttributeBooleanFormContainer';
import DataAttributeCheckBoxFormContainer from 'ui/data-types/common/DataAttributeCheckBoxFormContainer';
import DataAttributeHypertextFormContainer from 'ui/data-types/common/DataAttributeHypertextFormContainer';
import DataAttributeCompositeFormContainer from 'ui/data-types/common/DataAttributeCompositeFormContainer';
import DataAttributeDateFormContainer from 'ui/data-types/common/DataAttributeDateFormContainer';
import DataAttributeEnumeratorFormContainer from 'ui/data-types/common/DataAttributeEnumeratorFormContainer';
import DataAttributeEnumeratorMapFormContainer from 'ui/data-types/common/DataAttributeEnumeratorMapFormContainer';
import DataAttributeLongtextFormContainer from 'ui/data-types/common/DataAttributeLongtextFormContainer';
import DataAttributeMonolistFormContainer from 'ui/data-types/common/DataAttributeMonolistFormContainer';
import DataAttributeMonotextFormContainer from 'ui/data-types/common/DataAttributeMonotextFormContainer';
import DataAttributeNumberFormContainer from 'ui/data-types/common/DataAttributeNumberFormContainer';
import DataAttributeTextFormContainer from 'ui/data-types/common/DataAttributeTextFormContainer';
import DataAttributeThreeStateFormContainer from 'ui/data-types/common/DataAttributeThreeStateFormContainer';
import DataAttributeTimestampFormContainer from 'ui/data-types/common/DataAttributeTimestampFormContainer';


const AttributePage = ({ container }) => {
  const LoadContainer = () => {
    // console.log('Container', container);
    switch (container) {
      case 'Boolean':
        return <DataAttributeBooleanFormContainer />;
      case 'CheckBox':
        return <DataAttributeCheckBoxFormContainer />;
      case 'Composite':
        return <DataAttributeCompositeFormContainer />;
      case 'Date':
        return <DataAttributeDateFormContainer />;
      case 'Enumerator':
        return <DataAttributeEnumeratorFormContainer />;
      case 'EnumeratorMap':
        return <DataAttributeEnumeratorMapFormContainer />;
      case 'Hypertext':
        return <DataAttributeHypertextFormContainer />;
      case 'Longtext':
        return <DataAttributeLongtextFormContainer />;
      case 'Monolist':
        return <DataAttributeMonolistFormContainer />;
      case 'Monotext':
        return <DataAttributeMonotextFormContainer />;
      case 'Number':
        return <DataAttributeNumberFormContainer />;
      case 'Text':
        return <DataAttributeTextFormContainer />;
      case 'ThreeState':
        return <DataAttributeThreeStateFormContainer />;
      case 'Timestamp':
        return <DataAttributeTimestampFormContainer />;

      default: return <DataAttributeBooleanFormContainer />;
    }
  };

  return (
    <InternalPage className="AttributePage">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <FormattedMessage id="menu.data" />
              </BreadcrumbItem>
              <BreadcrumbItem route={ROUTE_DATA_TYPE_LIST}>
                <FormattedMessage id="menu.dataType" />
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <FormattedMessage id="app.add" />
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <PageTitle
          titleId="app.attribute"
          helpId="dataType.help"
        />
        <Row>
          <Col xs={12} >
            {LoadContainer()}
          </Col>
        </Row>
      </Grid>
    </InternalPage>
  );
};

AttributePage.propTypes = {
  container: PropTypes.node.isRequired,
};

export default AttributePage;
