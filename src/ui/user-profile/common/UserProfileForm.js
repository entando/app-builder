import { reduxForm } from 'redux-form';

import EntityForm from 'ui/common/entities/EntityForm';

export class UserProfileFormBody extends EntityForm {}

const UserForm = reduxForm({
  form: 'UserProfile',
})(UserProfileFormBody);

export default UserForm;
