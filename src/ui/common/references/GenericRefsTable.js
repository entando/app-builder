import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Spinner, Alert } from 'patternfly-react';
import { Table } from 'react-bootstrap';

class GenericRefsTable extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { referenceKey, references, loading } = this.props;

    const renderRows = () => references.map((reference, index) => (
      <tr key={reference.code ? reference.code : `${referenceKey}-tr-${index}`}>
        {Object.keys(reference).map(objKey => (
          <td key={`${referenceKey}-td-${objKey}`} className="GenericRefsTable__td">
            {reference[objKey]}
          </td>
        ))}
      </tr>
    ));

    const renderTable = () => {
      if (references.length > 0) {
        return (
          <div>
            <Table className="GenericRefsTable__table" striped bordered condensed hover >
              <thead>
                <tr>
                  {Object.keys(references[0]).map(objKey => (
                    <th key={`${referenceKey}-th-${objKey}`} className="GenericRefsTable__th">{objKey}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {renderRows()}
              </tbody>
            </Table>
          </div>
        );
      }
      return (
        <Alert type="info">
          <strong><FormattedMessage id={`reference.noReference${referenceKey}`} /></strong>
        </Alert>
      );
    };

    return (
      <div className="GenericRefsTable">
        <Spinner loading={loading} >
          {renderTable()}
        </Spinner>
      </div>
    );
  }
}

GenericRefsTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  references: PropTypes.arrayOf(PropTypes.shape({})),
  referenceKey: PropTypes.string,
};

GenericRefsTable.defaultProps = {
  onWillMount: () => {},
  loading: false,
  references: [],
  referenceKey: '',
};

export default GenericRefsTable;
