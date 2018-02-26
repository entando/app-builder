import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widget-list-page/WidgetListTable';
import RowListContainer from 'ui/widget-list-page/RowListContainer';
import PageTitle from 'ui/internal-page/PageTitle';

import { Row, Col, Button } from 'patternfly-react';

import { FormattedMessage } from 'react-intl';
import 'sass/widget-list-page/WidgetListPage.scss';
import { formattedText } from 'frontend-common-components';

class WidgetListPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.onClickAdd = this.onClickAdd.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  onClickAdd(ev) {
    ev.preventDefault();
    this.props.onClickCreate();
    // alert('connect to create a new widget function');
  }

  render() {
    return (
      <InternalPage className="WidgetListPage">
        <PageTitle
          title={formattedText('widget.list.title')}
          helpMessage={formattedText('widget.help')}
        />
        <Row>
          <Col md={12} className="">
            <Button
              type="button"
              className="pull-right WidgetListPage__add"
              bsStyle="primary"
              onClick={this.onClickAdd}
            >
              <FormattedMessage
                id="widget.list.new"
              />
            </Button>
            <WidgetListTable >
              <RowListContainer />
            </WidgetListTable>
          </Col>
        </Row>
      </InternalPage>
    );
  }
}

WidgetListPage.propTypes = {
  onClickCreate: PropTypes.func,
  onWillMount: PropTypes.func,
};

WidgetListPage.defaultProps = {
  onClickCreate: () => {},
  onWillMount: () => {},
};


export default WidgetListPage;
