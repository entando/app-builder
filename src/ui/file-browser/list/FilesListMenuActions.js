import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';

const downloadLabel = <FormattedMessage id="fileBrowser.downloadFile" />;
const deleteLabel = <FormattedMessage id="app.delete" />;


const FilesListMenuActions = ({
  onClickDeleteFolder, onClickDeleteFile, onClickDownload, file,
}) => {
  if ((file.name !== 'protected') && (file.name !== 'public')) {
    if (file.directory) {
      return (
        <DropdownKebab pullRight id={`${file}-actions`}>
          <MenuItem
            className="FilesListMenuAction__delete"
            onClick={() => onClickDeleteFolder(file)}
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
        <MenuItem
          className="FilesListMenuAction__delete"
          onClick={() => onClickDeleteFile(file)}
        >
          {deleteLabel}
        </MenuItem>
      </DropdownKebab>
    );
  }
  return <div />;
};

FilesListMenuActions.propTypes = {
  onClickDeleteFolder: PropTypes.func,
  onClickDeleteFile: PropTypes.func,
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
  onClickDeleteFolder: () => {},
  onClickDeleteFile: () => {},
};

export default FilesListMenuActions;
