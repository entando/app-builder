import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Spinner, DropdownKebab, MenuItem, Button } from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { ROUTE_PAGE_TEMPLATE_DETAIL } from 'app-init/router';
import Search from 'ui/common/Search';
import PageTemplatePreview from 'ui/page-templates/list/PageTemplatePreview';

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
        !searchValue || code.includes(searchValue) || descr.includes(searchValue))
      .map(template => (
        <div className="PageTemplateListTable">
          <div className="Page_Template_List_Table">
            <PageTemplatePreview
              item={template}
              actions={
                <DropdownKebab id={`${template.code}-actions`}>
                  <MenuItem
                    onClick={() => {
                      const templatePath = ROUTE_PAGE_TEMPLATE_DETAIL.replace(':pageTemplateCode', template.code);
                      const link = `${global.location.href.split('/page')[0]}${templatePath}`;
                      window.open(link);
                    }}
                  >
                    <FormattedMessage id="app.details" />
                  </MenuItem>
                </DropdownKebab>
              }
              active={selected === template.code}
              onClick={() => handleTemplateClick(template.code)}
            />
          </div>
        </div>
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
        <Search className="FindTemplateModal__search-input" placeholder="Search Templates" onChange={handleSearchChange} reverse />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {renderRows()}
        </div>
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
