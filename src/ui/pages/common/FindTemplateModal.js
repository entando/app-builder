import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Modal, Col, Row, Paginator, Spinner, DropdownKebab, MenuItem } from 'patternfly-react';
import paginatorMessages from 'ui/paginatorMessages';
import { ROUTE_PAGE_TEMPLATE_DETAIL } from 'app-init/router';
import { TEMPLATE_THUMBNAIL } from 'ui/pages/common/const';

export const MODAL_ID = 'FindTemplateModal';

class FindTemplateModal extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTable() {
    const {
      page, pageSize, intl, pageTemplates,
    } = this.props;
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <Row>
        <Col xs={12}>
          <ul className="FindTemplateModal__template-list">
            {this.renderRows()}
          </ul>
          {
            pageTemplates.length > pageSize && <Paginator
              pagination={pagination}
              viewType="table"
              itemCount={this.props.totalItems}
              onPageSet={this.changePage}
              onPerPageSelect={this.changePageSize}
              messages={messages}
            />
          }
        </Col>
      </Row>
    );
  }

  renderRows() {
    const { onSelectClick, pageTemplates } = this.props;
    return (
      pageTemplates.map(page => (
        <li key={page.code} className="FindTemplateModal__template-list-li">
          {
            <button className="FindTemplateModal__template-list-button" onClick={() => { onSelectClick(page.code); }}>
              <img
                src={TEMPLATE_THUMBNAIL[page.code] || TEMPLATE_THUMBNAIL.custom}
                alt={page.descr}
              />
            </button>
          }
          <DropdownKebab
            className="FindTemplateModal__dropdown-kebab"
            id={`${page.code}-actions`}
            pullRight
          >
            <MenuItem
              onClick={() => {
                    const template = ROUTE_PAGE_TEMPLATE_DETAIL.replace(':pageTemplateCode', page.code);
                    const link = `${global.location.href.split('/page')[0]}${template}`;
                    window.open(link);
                }}
            >
              <FormattedMessage id="app.details" />
            </MenuItem>
          </DropdownKebab>
          <div className="text-center">
            {page.descr}
          </div>
        </li>
      ))
    );
  }

  render() {
    const modalTitle = (
      <Modal.Title><FormattedMessage id="pages.pageForm.findTemplate" /></Modal.Title>
    );

    return (
      <GenericModalContainer modalId={MODAL_ID} modalTitle={modalTitle} modalClassName="FindTemplateModal__modal" style={{ width: 800 }}>
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
        </Spinner>
      </GenericModalContainer>
    );
  }
}

FindTemplateModal.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onSelectClick: PropTypes.func.isRequired,
};

FindTemplateModal.defaultProps = {
  loading: false,
  pageTemplates: [],
};

export default injectIntl(FindTemplateModal);
