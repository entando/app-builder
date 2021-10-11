import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { routeConverter, formatDate } from '@entando/utils';
import { Collapse } from 'react-bootstrap';
import { ROUTE_CMS_EDIT_CONTENT, ROUTE_CMS_ASSETS_LIST } from 'app-init/router';

import GenericRefsTable from 'ui/common/references/GenericRefsTable';

export const CONTENT_REFERENCES_KEY = 'jacmsContentManager';
export const RESOURCE_REFERENCES_KEY = 'jacmsResourceManager';

const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalItems: 0,
  perPageOptions: [5, 10, 15, 25, 50],
};

const REFERENCE_TABLE_COLUMNS = {
  [CONTENT_REFERENCES_KEY]: {
    description: {
      label: { id: 'category.reference.table.name', defaultMessage: 'Name' },
      render: (descr, id) => (
        <Link
          to={routeConverter(ROUTE_CMS_EDIT_CONTENT, { id })}
        >
          {descr}
        </Link>),
      thClass: '',
      tdClass: '',
    },
    id: {
      label: { id: 'category.reference.table.id', defaultMessage: 'Code' },
      render: id => <code>{id}</code>,
      thClass: '',
      tdClass: '',
    },
    typeCode: {
      label: { id: 'category.reference.table.typeCode', defaultMessage: 'Type' },
      render: typeCode => typeCode,
      thClass: '',
      tdClass: '',
    },
    lastModified: {
      label: { id: 'category.reference.table.lastModified', defaultMessage: 'Last Modified' },
      render: lastModified => formatDate(lastModified),
      thClass: 'text-center',
      tdClass: 'text-center',
    },
  },
  [RESOURCE_REFERENCES_KEY]: {
    description: {
      label: { id: 'category.reference.table.name', defaultMessage: 'Name' },
      render: descr => (
        <Link
          to={routeConverter(ROUTE_CMS_ASSETS_LIST)}
        >
          {descr}
        </Link>),
      thClass: '',
      tdClass: '',
    },
    id: {
      label: { id: 'category.reference.table.id', defaultMessage: 'Code' },
      render: id => id,
      thClass: '',
      tdClass: '',
    },
    typeCode: {
      label: { id: 'category.reference.table.typeCode', defaultMessage: 'Type' },
      render: typeCode => typeCode,
      thClass: '',
      tdClass: '',
    },
  },
};

class DetailCategoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    const { componentDidMount } = this.props;
    componentDidMount(this.props);
  }

  render() {
    const {
      category, referenceList, referenceMap, onPageChange,
      loading, contentsPagination, resourcesPagination,
    } = this.props;

    const paginationMap = {
      [CONTENT_REFERENCES_KEY]: contentsPagination,
      [RESOURCE_REFERENCES_KEY]: resourcesPagination,
    };

    const renderTitles = () => {
      if (category.titles) {
        return Object.keys(category.titles).map(langKey => (
          <span key={langKey} className="DetailCategory__detail-titles">
            <span className="DetailCategory__detail-titles-key">{langKey}</span>
            {category.titles[langKey]}
          </span>
        ));
      }
      return '';
    };

    const renderReferences = () => (
      referenceList
        .sort()
        .filter(referenceKey => Object.keys(REFERENCE_TABLE_COLUMNS).includes(referenceKey))
        .map(referenceKey => (
          <Row key={`${referenceKey}`} className="DetailCategory__reference">
            <Col xs={12}>
              <fieldset className="no-padding">
                <legend><FormattedMessage id={`reference.${referenceKey}`} /></legend>
                <GenericRefsTable
                  loading={loading}
                  pagination={paginationMap[referenceKey]}
                  referenceKey={referenceKey}
                  references={referenceMap[referenceKey]}
                  onPageChange={onPageChange}
                  columns={REFERENCE_TABLE_COLUMNS[referenceKey]}
                />
              </fieldset>
            </Col>
          </Row>
        ))
    );

    return (
      <div className="DetailCategory">
        <Button
          onClick={() => this.setState({ open: !this.state.open })}
          bsStyle="primary"
          className="DetailCategory__collapse-trigger"
        >
          <span className="icon fa fa-chevron-down" />&nbsp;
          <FormattedMessage id="app.info" />
        </Button>
        <Collapse in={this.state.open}>
          <Col xs={12} className="DetailCategory__detail-list">
            <Row className="DetailCategory__detail-row">
              <Col xs={2} className="DetailCategory__detail-label"><FormattedMessage id="app.code" /></Col>
              <Col xs={10} className="DetailCategory__detail-item">{category.code}</Col>
            </Row>
            <Row className="DetailCategory__detail-row">
              <Col xs={2} className="DetailCategory__detail-label"><FormattedMessage id="app.title" /></Col>
              <Col xs={10} className="DetailCategory__detail-item">{renderTitles()}</Col>
            </Row>
          </Col>
        </Collapse>

        {renderReferences()}
      </div>

    );
  }
}

DetailCategoryTable.propTypes = {
  componentDidMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  category: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
  referenceList: PropTypes.arrayOf(PropTypes.string),
  referenceMap: PropTypes.shape({}),
  loading: PropTypes.bool,
  contentsPagination: PropTypes.shape({}),
  resourcesPagination: PropTypes.shape({}),
};

DetailCategoryTable.defaultProps = {
  referenceList: [],
  referenceMap: {},
  loading: false,
  contentsPagination: defaultPagination,
  resourcesPagination: defaultPagination,
};

export default DetailCategoryTable;
