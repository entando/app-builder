import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import { Button } from 'patternfly-react';
// import { formattedText } from 'frontend-common-components';


class AuthorizationTable extends Component {
  constructor(props) {
    super(props);
    // this.renderTableContent = this.renderTableContent.bind(this);
    this.select = null;
  }


  // pushField() {
  //   // if (!this.select || !this.select.value) {
  //   //   return;
  //   // }
  //   const { selectedValues, fields } = this.props;
  //
  //   if (this.select.value && !selectedValues.includes(this.select.value)) {
  //     fields.push(this.select.value);
  //   }
  // }
  //
  //
  // renderTableContent() {
  //   const { selectedValues, fields } = this.props;
  //   return (
  //     <tr>
  //       <td className="AuthorizationTable__td">{selectedValues.groups}</td>
  //       <td className="AuthorizationTable__td text-center">{selectedValues.roles}</td>
  //       <td className="AuthorizationTable__td text-center">
  //         <Button
  //           bsStyle="link"
  //           className="AuthorizationTable__delete-tag-btn"
  //           onClick={() => fields.remove()}
  //         >
  //           <i className="fa fa-times" />
  //         </Button>
  //       </td>
  //     </tr>
  //   );
  // }

  render() {
    // console.log('TEST', this.props.selectedValues);
    return (
      <div className="AuthorizationTable">
        {/* <table className="table table-striped table-bordered">
          <thead>
            <tr>
          <th>
          <FormattedMessage id="user.authority.groups" />
          </th>
          <th className="text-center">
          <FormattedMessage id="user.authority.roles" />
          </th>
          <th className="text-center" width="10%">
          <FormattedMessage id="app.actions" />
          </th>
            </tr>
          </thead>
          <tbody>
            { this.renderTableContent() }
          </tbody>
        </table> */}
      </div>
    );
  }
}

AuthorizationTable.propTypes = {
  // selectedValues: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // fields: PropTypes.shape({
  //   groups: PropTypes.string,
  //   roles: PropTypes.string,
  // }).isRequired,
};

AuthorizationTable.defaultProps = {
};

export default AuthorizationTable;
