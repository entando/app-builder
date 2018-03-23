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


  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="UserAuthorityPageForm form-horizontal">
        <Col sm={12}>
          <Grid fluid>
            <Row>
              <Col sm={12}>
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
          <Col sm={12}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right"
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
  onSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func,
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
  onWillMount: () => {},
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
