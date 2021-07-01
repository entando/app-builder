import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Col, Row, Spinner, DropdownKebab, MenuItem, Button } from 'patternfly-react';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { ROUTE_PAGE_TEMPLATE_DETAIL } from 'app-init/router';
import { TEMPLATE_THUMBNAIL } from 'ui/pages/common/const';

export const MODAL_ID = 'FindTemplateModal';

const FindTemplateModal = ({
  onSelectClick, pageTemplates, isEditMode, loading,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const [selected, setSelected] = useState(null);

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearchValue(value);
  };

  const handleTemplateClick = (code) => {
    setSelected(code);
  };

  const handleModalClose = () => {
    setSelected(null);
    setSearchValue('');
  };

  const handleSave = () => {
    onSelectClick(selected, isEditMode);
    handleModalClose();
  };

  const renderRows = () => (
    pageTemplates
      .filter(({ code, descr }) =>
        !searchValue || code.startsWith(searchValue) || descr.startsWith(searchValue))
      .map(({ code, descr }) => (
        <li
          key={code}
          className={`FindTemplateModal__template-list-li ${selected === code ? 'FindTemplateModal__template-list-li--selected' : ''}`}
        >
          {
            <button className="FindTemplateModal__template-list-button" onClick={() => handleTemplateClick(code)}>
              <img
                src={TEMPLATE_THUMBNAIL[code] || TEMPLATE_THUMBNAIL.custom}
                alt={descr}
              />
            </button>
          }
          <DropdownKebab
            className="FindTemplateModal__dropdown-kebab"
            id={`${code}-actions`}
            pullRight
          >
            <MenuItem
              onClick={() => {
              const templatePath = ROUTE_PAGE_TEMPLATE_DETAIL.replace(':pageTemplateCode', code);
              const link = `${global.location.href.split('/page')[0]}${templatePath}`;
              window.open(link);
            }}
            >
              <FormattedMessage id="app.details" />
            </MenuItem>
          </DropdownKebab>
          <div className="text-center FindTemplateModal__caption">
            {descr}
          </div>
        </li>
      ))
  );

  const modalTitle = (
    <Modal.Title><FormattedMessage id="pages.pageForm.chooseTemplate" /></Modal.Title>
  );

  const saveButton = (
    <Button
      id="FindTemplateModal__save"
      bsStyle="primary"
      disabled={!selected}
      onClick={handleSave}
    >
      <FormattedMessage id="app.save" />
    </Button>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalClassName="FindTemplateModal__modal"
      buttons={[saveButton]}
      modalCloseCleanup={handleModalClose}
    >
      <Spinner loading={!!loading}>
        <Row>
          <input className="FindTemplateModal__search-input" placeholder="Search Templates" onChange={handleSearchChange} />
        </Row>
        <Row>
          <Col xs={12}>
            <ul className="FindTemplateModal__template-list">
              {renderRows()}
            </ul>
          </Col>
        </Row>
      </Spinner>
    </GenericModalContainer>
  );
};

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
