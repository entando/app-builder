import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { required } from '@entando/utils';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderCategoryTreeInput from 'ui/common/category/RenderCategoryTreeInput';
import FormLabel from 'ui/common/form/FormLabel';
import RowSpinner from 'ui/common/RowSpinner';
import { LOADING_GROUP } from 'ui/assets/modals/upload-assets/constants';
import RenderTextInput from 'ui/common/form/RenderTextInput';

const UploadAssetModalFiles = (props) => {
  const {
    fields,
    group,
    categories,
    language,
    loading,
    ownerGroup,
  } = props;

  return (
    <div className="UploadAssetModal__file-container">
      {fields.map((file, index) => {
        const fileFieldGroup = fields.get(index);
        const isImg = fileFieldGroup.fileObject.type
          && fileFieldGroup.fileObject.type.startsWith('image/');
        const uploading = (
          loading[LOADING_GROUP] && loading[LOADING_GROUP][fileFieldGroup.fileId]
        ) || false;

        return (
          <div className="UploadAssetModal__file" key={file}>
            {fields.length > 1 && (
              <div className="UploadAssetModal__remove-file-button">
                <button
                  type="button"
                  onClick={() => fields.remove(index)}
                >
                  <FormattedMessage id="cms.label.close" />
                  <i className="fa fa-times" />
                </button>
              </div>
            )}
            <div className="UploadAssetModal__file-info">
              <RowSpinner loading={uploading} />
            </div>
            {isImg && (
              <div>
                <img className="UploadAssetModal__file-preview" src={fileFieldGroup.filePreview} alt="file preview" />
              </div>
            )}
            <Row>
              <Col>
                <Field
                  component={RenderTextInput}
                  name={`${file}.filename`}
                  label={<FormLabel labelId="cms.label.name" required />}
                  validate={[required]}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={RenderSelectInput}
                  name={`${file}.group`}
                  labelSize={2}
                  label={<FormLabel labelId="cms.assets.form.group" required />}
                  defaultOptionId="cms.label.chooseoption"
                  optionDisplayName="name"
                  optionValue="code"
                  options={group}
                  disabled={!!ownerGroup}
                  validate={[required]}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  component={RenderCategoryTreeInput}
                  name={`${file}.categories`}
                  labelSize={2}
                  label={<FormLabel labelId="cms.assets.form.categories" />}
                  language={language}
                  categories={categories}
                />
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

UploadAssetModalFiles.propTypes = {
  language: PropTypes.string.isRequired,
  group: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  fields: PropTypes.shape({
    map: PropTypes.func,
    get: PropTypes.func,
    length: PropTypes.number,
    remove: PropTypes.func,
  }).isRequired,
  loading: PropTypes.shape({}).isRequired,
  ownerGroup: PropTypes.string,
};

UploadAssetModalFiles.defaultProps = {
  categories: [],
  group: [],
  ownerGroup: '',
};

export default UploadAssetModalFiles;
