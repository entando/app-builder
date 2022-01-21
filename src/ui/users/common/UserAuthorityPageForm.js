import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Spinner } from 'patternfly-react';
import { withFormik, Form } from 'formik';
import { MultiField } from 'helpers/formikUtils';
import { makeGroupRolesCombo } from 'state/users/selectors';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { ACTION_SAVE } from 'state/users/const';
import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';
import { TEST_ID_USER_AUTHORITY_PAGE_FORM } from 'ui/test-const/user-test-const';

export const UserAuthorityPageFormBody = ({
  groups, roles, values, loading,
  groupsMap, rolesMap,
  onDidMount, isValid, isSubmitting: submitting,
  onAddNewClicked, onCloseModal, onNewAuthAdded,
}) => {
  useEffect(() => {
    onDidMount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const invalid = !isValid;
  const groupRolesCombo = makeGroupRolesCombo(values.groupRolesCombo, groupsMap, rolesMap);

  return (
    <Spinner loading={!!loading}>
      <Form
        className="UserAuthorityPageForm form-horizontal"
      >
        <Col xs={12}>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <MultiField
                  name="groupRolesCombo"
                  component={UserAuthorityTable}
                  groups={groups}
                  roles={roles}
                  groupRolesCombo={groupRolesCombo}
                  onAddNewClicked={onAddNewClicked}
                  onNewAuthAdded={onNewAuthAdded}
                  onCloseModal={onCloseModal}
                />
              </Col>
            </Row>
          </Grid>
          <Col xs={12}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right"
              disabled={invalid || submitting}
              data-testid={TEST_ID_USER_AUTHORITY_PAGE_FORM.SAVE_BUTTON}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Col>
      </Form>
    </Spinner>
  );
};

UserAuthorityPageFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  onAddNewClicked: PropTypes.func.isRequired,
  onNewAuthAdded: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  groupsMap: PropTypes.shape({}),
  rolesMap: PropTypes.shape({}),
  values: PropTypes.shape({
    groupRolesCombo: PropTypes.arrayOf(PropTypes.shape({
      group: PropTypes.string,
      role: PropTypes.string,
    })),
  }),
  loading: PropTypes.bool,

};

UserAuthorityPageFormBody.defaultProps = {
  isValid: false,
  isSubmitting: false,
  groups: [],
  roles: [],
  groupsMap: {},
  rolesMap: {},
  values: {
    groupRolesCombo: [],
  },
  loading: false,
};

const UserAuthorityPageForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ initialValues }) => initialValues,
  validationSchema: Yup.object().shape({
    groupRolesCombo: Yup.array().of(Yup.object().shape({
      group: Yup.string(),
      role: Yup.string(),
    })),
  }),
  handleSubmit: (
    values,
    {
      props: { onSubmit, actionOnSave },
      setSubmitting,
    },
  ) => {
    onSubmit(values, actionOnSave || ACTION_SAVE).then(() => (
      setSubmitting(false)
    ));
  },
  displayName: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
