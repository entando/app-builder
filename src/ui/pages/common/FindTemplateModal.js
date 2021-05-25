import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Modal, Col, Row, Spinner, DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_PAGE_TEMPLATE_DETAIL } from 'app-init/router';
import { TEMPLATE_THUMBNAIL } from 'ui/pages/common/const';

export const MODAL_ID = 'FindTemplateModal';

class FindTemplateModal extends React.Component {
  renderRows() {
    const { onSelectClick, pageTemplates, isEditMode } = this.props;
    return (
      pageTemplates.map(page => (
        <li key={page.code} className="FindTemplateModal__template-list-li">
          {
            <button className="FindTemplateModal__template-list-button" onClick={() => { onSelectClick(page.code, isEditMode); }}>
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
          <div className="text-center FindTemplateModal__caption">
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
      <GenericModalContainer modalId={MODAL_ID} modalTitle={modalTitle} modalClassName="FindTemplateModal__modal">
        <Spinner loading={!!this.props.loading}>
          <Row>
            <Col xs={12}>
              <ul className="FindTemplateModal__template-list">
                {this.renderRows()}
              </ul>
            </Col>
          </Row>
        </Spinner>
      </GenericModalContainer>
    );
  }
}

FindTemplateModal.propTypes = {
  loading: PropTypes.bool,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  onSelectClick: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool,
};

FindTemplateModal.defaultProps = {
  loading: false,
  pageTemplates: [],
  isEditMode: false,
};

export default FindTemplateModal;
