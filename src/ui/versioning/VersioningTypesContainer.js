import { connect } from 'react-redux';
import withPermissions from 'ui/auth/withPermissions';
import {
  CRUD_CONTENTS_PERMISSION,
  SUPERUSER_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
} from 'state/permissions/const';

import VersioningTypes from 'ui/versioning/VersioningTypes';

export const mapStateToProps = () => ({
});

export const mapDispatchToProps = () => ({
});

const VersioningTypesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(VersioningTypes);

export default withPermissions([
  CRUD_CONTENTS_PERMISSION,
  SUPERUSER_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
  VALIDATE_CONTENTS_PERMISSION,
])(VersioningTypesContainer);
