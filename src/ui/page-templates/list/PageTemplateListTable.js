import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Spinner } from 'patternfly-react';
import { injectIntl } from 'react-intl';
import PageTemplateDeleteModalContainer from 'ui/page-templates/common/PageTemplateDeleteModalContainer';
import PageTemplateListMenuActions from 'ui/page-templates/list/PageTemplateListMenuActions';
import PageTemplatePreview from './PageTemplatePreview';

class PageTemplateListTable extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const { onWillMount } = this.props;
    onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderTable() {
    const { pageTemplates, removePageTemplate } = this.props;

    return (
      <Col xs={12}>
        <div className="Page_Template_List_Table">
          {pageTemplates.map(template => (
            <PageTemplatePreview
              key={template.code}
              item={template}
              actions={
                <PageTemplateListMenuActions
                  code={template.code}
                  onClickDelete={() => removePageTemplate(template.code)}
                />
              }
            />
          ))}
        </div>
      </Col>
    );
  }

  render() {
    return (
      <div className="PageTemplateListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <PageTemplateDeleteModalContainer />
        </Spinner>
      </div>
    );
  }
}

PageTemplateListTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  pageTemplates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })),
  pageSize: PropTypes.number.isRequired,
  removePageTemplate: PropTypes.func.isRequired,
};

PageTemplateListTable.defaultProps = {
  onWillMount: () => { },
  loading: false,
  pageTemplates: [],
};

export default injectIntl(PageTemplateListTable);
