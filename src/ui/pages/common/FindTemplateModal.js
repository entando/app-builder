import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal, Col, Row, Paginator, Spinner } from 'patternfly-react';
import paginatorMessages from 'ui/paginatorMessages';
import { ROUTE_PAGE_TEMPLATE_DETAIL } from 'app-init/router';

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
    const { page, pageSize, intl } = this.props;
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
          <table className="PageTemplateListTable__table table table-striped table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage id="app.code" /></th>
                <th><FormattedMessage id="app.name" /></th>
                <th className="text-center" width="180px">
                  <FormattedMessage id="app.actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
        </Col>
      </Row>
    );
  }

  renderRows() {
    const { onSelectClick } = this.props;
    return (
      this.props.pageTemplates.map(pageTemplate => (
        <tr key={pageTemplate.code}>
          <td className="PageTemplateListTable__td">{pageTemplate.code}</td>
          <td className="PageTemplateListTable__td">{pageTemplate.descr}</td>
          <td className="PageTemplateListTable__td text-center">
            <Button
              bsStyle="default"
              id="FindTemplateModal__button-detail"
              onClick={() => {
                const template = ROUTE_PAGE_TEMPLATE_DETAIL.replace(':pageTemplateCode', pageTemplate.code);
                const link = `${global.location.href.split('/page')[0]}${template}`;
                window.open(link);
            }}
            >
              <FormattedMessage id="app.details" />
            </Button>
            {' '}
            <Button bsStyle="primary" id="FindTemplateModal__button-select" onClick={() => { onSelectClick(pageTemplate.code); }}>
              <FormattedMessage id="app.select" />
            </Button>
          </td>
        </tr>
      ))
    );
  }

  render() {
    const modalTitle = (
      <Modal.Title><FormattedMessage id="pages.pageForm.findTemplate" /></Modal.Title>
    );

    return (
      <GenericModalContainer modalId={MODAL_ID} modalTitle={modalTitle} className="FindTemplateModal">
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
