import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'patternfly-react';
import { reduxForm, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';

export class UserAuthorityPageFormBody extends Component {
  constructor(props) {
    super(props);
    this.group = null;
    this.role = null;
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const { invalid, submitting } = this.props;
    console.log(invalid || submitting);

    return (
      <form onSubmit={this.onSubmit} className="UserAuthorityPageForm form-horizontal">
        <Col xs={12}>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <FieldArray
                  name="groupRolesCombo"
                  component={UserAuthorityTable}
                  groups={this.props.groups}
                  roles={this.props.roles}
                  groupRolesCombo={this.props.groupRolesCombo}
                  selectedJoinValues={this.props.selectedJoinValues}
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
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Col>
      </form>
    );
  }
}

UserAuthorityPageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  groupRolesCombo: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    role: PropTypes.string,
  })),
  selectedJoinValues: PropTypes.shape({
    groups: PropTypes.string,
    roles: PropTypes.string,
  }),
};

UserAuthorityPageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  groups: [],
  roles: [],
  groupRolesCombo: [],
  selectedJoinValues: {
    groups: null,
    roles: null,
  },
};

const UserAuthorityPageForm = reduxForm({
  form: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
