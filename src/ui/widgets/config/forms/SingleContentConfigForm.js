import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import ContentTableRenderer from 'ui/widgets/config/forms/ContentTableRenderer';

const filters = [
  { code: '', nameId: 'widget.form.selectFilter' },
  { code: 'created', nameId: 'widget.form.creationDate' },
  { code: 'modified', nameId: 'widget.form.lastModify' },
];

const orderFilters = [
  {
    code: '',
    nameId: 'app.enumerator.none',
  },
  {
    code: 'ASC',
    nameId: 'widget.form.asc',
  },
  {
    code: 'DESC',
    nameId: 'widget.form.desc',
  },
];

const filtersSuboptions = {
  created: orderFilters,
  modified: orderFilters,
};

class SingleContentConfigFormBody extends PureComponent {
  render() {
    const {
      contentModels, handleSubmit, invalid, submitting, intl,
    } = this.props;
    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <FieldArray
                intl={intl}
                component={ContentTableRenderer}
                name="filters"
                options={filters}
                suboptions={filtersSuboptions}
                filterName="filters"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                component={RenderSelectInput}
                name="contentModel"
                label={
                  <FormLabel labelId="widget.singleContent.config.contentModel" />
                }
                options={contentModels}
                optionValue="code"
                optionDisplayName="name"
              />
            </Col>
          </Row>


          <Row>
            <Col xs={12}>
              <Button
                className="pull-right"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </Col>
          </Row>
        </form>
      </Fragment>
    );
  }
}

const SingleContentConfigForm = reduxForm({
  form: 'widgets.singleContentConfig',
})(SingleContentConfigFormBody);

SingleContentConfigFormBody.propTypes = {
  intl: intlShape.isRequired,
  contentModels: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default SingleContentConfigForm;
