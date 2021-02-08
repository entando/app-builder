import React from 'react';
import PropTypes from 'prop-types';
import getRuntimeEnv from 'helpers/getRuntimeEnv';

const { DOMAIN } = getRuntimeEnv();

const createDomainPath = path => `${DOMAIN.replace('/entando-de-app', '')}${path}`;

const MyProfilePicture = ({ versions, onDelete }) => versions && (
<div className="MyProfilePicture">
  <div>
    <img src={createDomainPath(versions[0].path)} alt="User profile" className="MyProfilePicture__img" />
  </div>
  <div>
    <div>
      <span className="MyProfilePicture__description">{versions[0].path.split('/').pop()}</span>
    </div>
    <div>
      <ul className="MyProfilePicture__dimensions">
        {versions.map(version =>
          <li key={version.path}><a href={createDomainPath(version.path)} download>{version.dimensions || 'Original size'}</a> <span>{version.size}</span></li>)}
      </ul>
    </div>
  </div>
  <div className="MyProfilePicture__actions">
    <i className="fa fa-trash" onClick={onDelete} role="button" tabIndex={0} onKeyUp={onDelete} />
  </div>
</div>
);

MyProfilePicture.propTypes = {
  onDelete: PropTypes.func.isRequired,
  versions: PropTypes.arrayOf(PropTypes.shape({
    dimensions: PropTypes.string,
    path: PropTypes.string,
    size: PropTypes.string,
  })),
};

MyProfilePicture.defaultProps = {
  versions: null,
};

export default MyProfilePicture;
