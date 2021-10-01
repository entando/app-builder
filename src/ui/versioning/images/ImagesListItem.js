import React from 'react';
import PropTypes from 'prop-types';
import { ListViewItem } from 'patternfly-react';

import ImagesListItemActions from 'ui/versioning/images/ImagesListItemActions';

const ImagesListItem = ({
  image, onClickRemove, onClickRecover, domain,
}) => (
  <ListViewItem
    actions={(
      <ImagesListItemActions
        imageId={image.id}
        onClickRemove={onClickRemove}
        onClickRecover={onClickRecover}
        imageDescription={image.description}
      />
    )}
    compoundExpand={false}
    compoundExpanded={false}
    description={(
      <div className="ImagesListItem">
        <img
          src={`${domain}/${image.versions && image.versions.length > 0 && image.versions[1].path}`}
          className="ImagesListItem__image"
          alt={image.description}
        />
        <h4 className="ImagesListItem__description">{image.description}</h4>
      </div>
    )}
    hideCloseIcon={false}
    stacked={false}
  />
);

ImagesListItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    lastVersion: PropTypes.string,
    versions: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
    })).isRequired,
  }).isRequired,
  onClickRemove: PropTypes.func,
  onClickRecover: PropTypes.func,
  domain: PropTypes.string.isRequired,
};

ImagesListItem.defaultProps = {
  onClickRemove: () => {},
  onClickRecover: () => {},
};

export default ImagesListItem;
