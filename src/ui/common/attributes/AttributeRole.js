import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'formik';
import RoleSelectRenderer from 'ui/common/formik-field/RoleSelectRenderer';

class AttributeRole extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { allowedRoles, allRoles, form } = this.props;

    const selectAllowedOptions = allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    const allOptions = allRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    const getAttributeRoleLabel = item => item && `${item.value} - ${item.text}`;

    const roleWrapper = () => {
      if (isEmpty(allowedRoles) && isEmpty(form.initialValues.joinRoles)) {
        return (
          <FormGroup>
            <Col xs={10}>
              <FormattedMessage id="app.no.roles" />
            </Col>
          </FormGroup>
        );
      }

      return (
        <FormGroup>
          <label htmlFor="attrRole" className="col-xs-2 control-label">
            <FormattedMessage id="app.role" />
          </label>
          <Col xs={10}>
            <FieldArray
              name="joinRoles"
              render={formik => (<RoleSelectRenderer
                {...formik}
                options={selectAllowedOptions}
                allRoles={allOptions}
                valueKey="value"
                labelFn={getAttributeRoleLabel}
                emptyOptionTextId="app.chooseARole"

              />)}

            />
          </Col>
        </FormGroup>
      );
    };

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.roles" />
            </legend>
            {roleWrapper()}
          </fieldset>
        </Col>
      </Row>
    );
  }
}

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  allRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  joinAllowedOptions: PropTypes.arrayOf(PropTypes.string),
  form: PropTypes.shape({
    initialValues: PropTypes.shape({
      joinRoles: PropTypes.arrayOf(),
    }),
  }),
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
  allowedRoles: [],
  allRoles: [],
  joinAllowedOptions: [],
  form: {
    initialValues: {},
  },
};


export default AttributeRole;
