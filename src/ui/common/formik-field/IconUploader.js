import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Col, ControlLabel, Button, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getLoading } from 'state/loading/selectors';
import { uploadIcon } from 'state/widgets/actions';
import { getTouchErrorByField } from 'helpers/formikUtils';

import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import IconLibrary, { MODAL_ID } from 'ui/widgets/common/IconLibrary';

const IconUploader = ({
  field, append, labelSize, label, help, alignClass, inputSize, disabled, 'data-testid': dataTestId,
  form,
}) => {
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const { iconUpload: loading } = useSelector(getLoading);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length && !disabled) {
      const fileName = `asset:${acceptedFiles[0].name.split('.')[0]}`;
      dispatch(uploadIcon(acceptedFiles[0]))
        .then(async () => {
          await form.setFieldValue(field.name, fileName);
          await form.setFieldTouched(field.name, true);
        });
    }
  }, [disabled, dispatch, field.name, form]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, noClick: true, multiple: false, accept: 'image/svg+xml',
  });

  const handleIconLibraryClick = () => {
    dispatch(setVisibleModal(MODAL_ID));
  };

  const handleIconSelect = async (selectedIcon) => {
    await form.setFieldValue(field.name, `font-awesome:${selectedIcon}`);
    await form.setFieldTouched(field.name, true);
    dispatch(setVisibleModal(''));
  };

  const value = field.value ? field.value.split(':')[1] : null;
  const isLoading = loading === 'iconUpload';

  const { touched, error } = getTouchErrorByField(field.name, form);

  return (
    <div className={cx('IconUploader', (touched && error) ? 'form-group has-error' : 'form-group')}>
      {
        labelSize > 0 ? (
          <Col xs={labelSize} className={alignClass}>
            <ControlLabel htmlFor={field.name}>
              {label} {help}
            </ControlLabel>
          </Col>
        ) : ''
      }
      <Col xs={inputSize || 12 - labelSize}>
        <div {...getRootProps()} className="IconUploader__container">
          <Spinner loading={isLoading}>
            <input {...field} data-testid={dataTestId} type="hidden" />
            <input {...getInputProps()} ref={inputFileRef} />
            {
                field.value
                    ?
                      <div>
                        <WidgetIcon icon={field.value} className="IconUploader__uploaded-icon" />
                        <p className="IconUploader__description">{value}</p>
                      </div>
                    :
                      <div>
                        <span className="fa fa-cloud-upload IconUploader__icon" />
                        <p className="IconUploader__description"><FormattedMessage id="widget.icon.description" /></p>
                      </div>
            }
          </Spinner>
          <div>
            <Button
              type="button"
              bsStyle="default"
              onClick={handleIconLibraryClick}
              disabled={isLoading || disabled}
            >
              <FormattedMessage id="widget.icon.iconLibrary" />
            </Button>
            {' '}
            <Button
              type="button"
              bsStyle="default"
              onClick={() => {
                  if (inputFileRef) {
                      inputFileRef.current.click();
                  }
                }}
              disabled={isLoading || disabled}
            >
              <FormattedMessage id="widget.icon.upload" />
            </Button>
          </div>
        </div>
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && ((error && <span className="help-block">{error}</span>))}
      </Col>
      <IconLibrary selected={value} onSelect={handleIconSelect} />
    </div>
  );
};

IconUploader.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    name: PropTypes.string,
  }),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    setFieldTouched: PropTypes.func,
    setFieldValue: PropTypes.func,
  }),
  label: PropTypes.node,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  alignClass: PropTypes.string,
  append: PropTypes.string,
  tourClass: PropTypes.string,
  'data-testid': PropTypes.string,
};

IconUploader.defaultProps = {
  field: {},
  meta: {},
  form: {},
  labelSize: 2,
  alignClass: 'text-right',
  label: null,
  help: null,
  disabled: false,
  inputSize: null,
  append: '',
  tourClass: '',
  'data-testid': '',
};

export default IconUploader;
