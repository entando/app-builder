import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem } from 'patternfly-react';
import { useDispatch } from 'react-redux';
import md5 from 'md5';

import { uploadFile } from 'state/file-browser/actions';
import { getResourcePath } from 'helpers/resourcePath';

const FILE_BROWSER_PATH = 'static/profile';
const GRAVATAR = 'GRAVATAR';
const GRAVATAR_URL = 'https://pt.gravatar.com/avatar';
const publicUrl = process.env.PUBLIC_URL;
const imageProvider = getResourcePath(FILE_BROWSER_PATH);

const toMd5 = string => md5(string.trim().toLowerCase());

const ProfileImageUploader = ({
  image, onChange, gravatarEmail, editable,
}) => {
  const [edit, setEdit] = useState(false);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();

  const onFileChange = ({ target: { files } }) => {
    dispatch(uploadFile(files[0], FILE_BROWSER_PATH)).then(() => onChange(files[0].name));
  };

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  let userPicture = `${publicUrl}/images/user-icon.svg`;
  if (edit) {
    userPicture = `${publicUrl}/images/user-edit.svg`;
  } else if (image === GRAVATAR && gravatarEmail) {
    userPicture = `${GRAVATAR_URL}/${toMd5(gravatarEmail)}`;
  } else if (image) {
    userPicture = `${imageProvider}/${image}`;
  }

  return (
    <div className="ProfileImageUploader">
      <Dropdown onToggle={() => setEdit(!edit)} disabled={!editable}>
        <Dropdown.Toggle>
          <input
            ref={inputFileRef}
            onChange={onFileChange}
            type="file"
            accept=".jpg,.png"
            className="ProfileImageUploader__file-upload"
          />
          <button type="button">
            <img src={userPicture} alt="user profile"className="ProfileImageUploader__picture" />
          </button>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey="1" onClick={handleUploadClick}>Upload Image</MenuItem>
          { gravatarEmail && <MenuItem eventKey="2" onClick={() => onChange(GRAVATAR)}>Use Gravatar</MenuItem>}
          <MenuItem eventKey="3" onClick={() => onChange('')}>Remove Image</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

ProfileImageUploader.propTypes = {
  image: PropTypes.string,
  gravatarEmail: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

ProfileImageUploader.defaultProps = {
  image: '',
  gravatarEmail: '',
  editable: false,
};

export default ProfileImageUploader;
