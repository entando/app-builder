import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { ROUTE_FILE_BROWSER } from 'app-init/router';
import { LinkMenuItem } from 'frontend-common-components';

const downloadLabel = <FormattedMessage id="fileBrowser.downloadFile" />;
const deleteLabel = <FormattedMessage id="app.delete" />;


const FilesListMenuActions = ({ onClickDelete, onClickDownload, file }) => {
  if ((file.name !== 'protected') && (file.name !== 'public')) {
    if (file.directory) {
      return (
        <DropdownKebab pullRight id={`${file}-actions`}>
          <MenuItem
            className="FilesListMenuAction__delete"
            onClick={() => onClickDelete(file)}
          >
            {deleteLabel}
          </MenuItem>
        </DropdownKebab>
      );
    }
    return (
      <DropdownKebab pullRight id={`${file.name}-actions`}>
        <MenuItem
          id={`download-${file.name}`}
          className="FilesListMenuAction__download"
          onClick={() => onClickDownload(file)}
        >
          {downloadLabel}
        </MenuItem>
        <LinkMenuItem
          id={`delete-${file.name}`}
          route={ROUTE_FILE_BROWSER}
          params={{ fileName: file.name }}
          label={deleteLabel}
          className="FilesListMenuAction__delete"
        />
      </DropdownKebab>
    );
  }
  return <div />;
};

FilesListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  onClickDownload: PropTypes.func,
  file: PropTypes.shape({
    name: PropTypes.string,
    lastModifiedTime: PropTypes.string,
    size: PropTypes.number,
    directory: PropTypes.bool,
    path: PropTypes.string,
  }).isRequired,
};

FilesListMenuActions.defaultProps = {
  onClickDownload: () => {},
  onClickDelete: () => {},
};

export default FilesListMenuActions;
